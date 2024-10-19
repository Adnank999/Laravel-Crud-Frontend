import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages,
} from "react-country-state-city";
import { z } from "zod";
import { useDemoGraphicStore } from "@/store/useDemoGraphicStore";
import timezones from "timezones-list";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useClientAddressIdStore } from "@/store/useClientAddressIdStore";
import { useRouter } from "next/navigation";
const editGeoFormSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  postal_code: z
    .string()
    .min(1, "Postal code is required")
    .max(10, "Postal code cannot exceed 10 characters")
    .refine((value) => /^\d+$/.test(value), {
      message: "Postal code must contain only numbers",
    }),
  timezone: z.string().min(1, "Timezone is required"),
  language: z
    .array(z.string())
    .min(1, "At least one language is required")
    .nonempty("Languages must be selected"),
});

export type GeographicClientFormSchema = z.infer<typeof editGeoFormSchema>;
interface Props {
  userId: number;
}
const DemoGraphicForm = ({ userId }: Props) => {
  const {
    countries,
    states,
    cities,
    languages,
    setCountries,
    setStates,
    setCities,
    setLanguages,
  } = useDemoGraphicStore();
  const {
    register,
    handleSubmit,
    setValue,
    control, 
    formState: { errors },
  } = useForm<GeographicClientFormSchema>({
    resolver: zodResolver(editGeoFormSchema),
  });

  const {
    selectedCountryId,
    selectedStateId,
    selectedCityId,
    setSelectedCountryId,
    setSelectedStateId,
    setSelectedCityId,
  } = useClientAddressIdStore();

  

  useEffect(() => {
    // Fetch countries and languages on component mount
    GetCountries().then((result) => {
      setCountries(result); // Store the fetched countries in Zustand
    });

    GetLanguages().then((result) => {
      setLanguages(result); // Store the fetched languages in Zustand
    });
  }, [setCountries, setLanguages]);

  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (data: GeographicClientFormSchema) => {
    // console.log("Final data:", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clientsDemographic/${userId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        toast({
          title: "Error!",
          description: errorData.message,
          duration: 1000,
        });
        return errorData.message || "Failed to update client";
      }

      const result = await response.json();
      router.refresh();
      // console.log("Client updated successfully:", result);

      toast({
        title: "Success!",
        description: "Client Updated successfully.",
        duration: 1000,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

 

 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 pr-52"
    >
      {/* Country Dropdown */}
      <Label htmlFor="country" className="text-left">
        Country
      </Label>
      <select
        style={{ border: "1px solid #e5e7eb" }}
        className="p-1 rounded-md"
        value={selectedCountryId || ""}
        onChange={(e) => {
          const selectedCountry = countries.find(
            (country) => country?.id === Number(e.target.value)
          );

          if (selectedCountry) {
            setSelectedCountryId(selectedCountry?.id); // Track selected countryId
            setValue("country", selectedCountry?.name); // Set country name in the form value
            // setSelectedCountryName(selectedCountry?.name);
            // Fetch states based on selected country ID
            GetState(selectedCountry.id).then((result) => {
              setStates(result); // Store the fetched states in Zustand
              setSelectedStateId(null); // Reset selectedStateId when a new country is selected
              setCities([]); // Reset cities when country changes
            });
          }
        }}
      >
        <option value="">Select Country</option>
        {countries.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {errors.country && (
        <span className="text-red-600">{errors.country.message}</span>
      )}

      <div className="flex flex-row justify-start items-center gap-10">
        {/* State Dropdown */}
        <div className="flex flex-col justify-start items-start gap-2">
          <Label htmlFor="state" className="text-left">
            State
          </Label>
          <div
            style={{ border: "1px solid #e5e7eb" }}
            className="p-1 rounded-md"
          >
            <select
              value={selectedStateId || ""}
              onChange={(e) => {
                const selectedState = states.find(
                  (state) => state.id === Number(e.target.value)
                );
                setSelectedStateId(selectedState?.id); // Track selected stateId
                setValue("state", selectedState?.name);
                //   setSelectedStateName(selectedState?.name);

                // Fetch cities based on selected country and state IDs
                if (selectedCountryId && selectedState?.id) {
                  GetCity(selectedCountryId, selectedState.id).then(
                    (result) => {
                      setCities(result); // Store the fetched cities in Zustand
                    }
                  );
                }
              }}
              disabled={states.length === 0}
            >
              <option value="">Select State</option>
              {states.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="text-red-600">{errors.state.message}</span>
            )}
          </div>
        </div>

        {/* City Dropdown */}
        <div className="flex flex-col justify-start items-start gap-2">
          <Label htmlFor="city" className="text-left">
            City
          </Label>
          <div
            style={{ border: "1px solid #e5e7eb" }}
            className="p-1 rounded-md"
          >
            <select
              // {...register("city")}
              value={selectedCityId || ""} // Track selected cityId for the dropdown
              onChange={(e) => {
                const selectedCity = cities.find(
                  (city) => city.id === Number(e.target.value)
                );

                if (selectedCity) {
                  setSelectedCityId(selectedCity?.id); // Track selected cityId
                  setValue("city", selectedCity?.name); // Store the city name in the form value
                }
              }}
              disabled={cities.length === 0}
            >
              <option value="">Select City</option>
              {cities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            {errors.city && (
              <span className="text-red-600">{errors.city.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <Label htmlFor="address" className="text-left">
        Address
      </Label>
      <Input {...register("address")} placeholder="Enter address" />
      {errors.address && (
        <span className="text-red-600">{errors.address.message}</span>
      )}

      {/* Postal Code */}
      <Label htmlFor="address" className="text-left">
        Zip/Postal Code
      </Label>
      <Input {...register("postal_code")} placeholder="Enter postal code" />
      {errors.postal_code && (
        <span className="text-red-600">{errors.postal_code.message}</span>
      )}

      {/* Timezone Dropdown */}
      <Label htmlFor="timezone" className="text-left">
        Timezone
      </Label>
      <select
        {...register("timezone")}
        style={{ border: "1px solid #e5e7eb" }}
        className="p-1 rounded-md"
      >
        <option value="">Select Timezone</option>
        {timezones.map((tz, index) => (
          <option key={index} value={tz.tzCode}>
            {tz.label}
          </option>
        ))}
      </select>
      {errors.timezone && (
        <span className="text-red-600">{errors.timezone.message}</span>
      )}

      {/* Multiple Language Selection with Controller */}
      <div>
        <Label htmlFor="language" className="text-left">
          Languages
        </Label>
        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <Select
              isMulti
              options={languages.map((lang) => ({
                label: lang.name, // Label is the name of the language
                value: lang.name.toLowerCase(), // Value is the lowercase version of the name
              }))}
              value={languages
                .filter((lang) =>
                  field.value?.includes(lang.name.toLowerCase())
                )
                .map((lang) => ({
                  label: lang.name,
                  value: lang.name.toLowerCase(),
                }))} // Match value format for selected items
              onChange={(selected) => {
                field.onChange((selected || []).map((option) => option.value)); // Handle null case by defaulting to empty array
              }}
            />
          )}
        />
        {errors.language && (
          <span className="text-red-600">{errors.language.message}</span>
        )}
      </div>

      <Button type="submit" className="w-32">
        Save Changes
      </Button>
    </form>
  );
};

export default DemoGraphicForm;
