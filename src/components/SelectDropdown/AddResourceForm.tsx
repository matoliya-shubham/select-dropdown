import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addResourceSchema } from "@/schema/addResourceSchema";
import type { AddResourceSchema } from "@/schema/addResourceSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconMap } from "@/constants/label";
import { FormModeType } from "@/types/DropdownContentType";
import { useResourceContent } from "@/hooks/useResourceContent";
import { useCallback } from "react";

export const AddResourceForm = () => {
  const {
    resourceContent,
    displayContent,
    selectedItem,
    formMode,
    handleOpenFormModal,
    isLoading,
    isEdit,
    updateResourceContent,
  } = useResourceContent();

  const [itemId, nestedItemId] = selectedItem || [];
  const selectedNestedItem = displayContent
    .find((item) => item.id === itemId)
    ?.nestedContent.find((nestedItem) => nestedItem.id === nestedItemId);

  const defaultValues = {
    name: selectedNestedItem?.title || "",
    category: itemId || "",
    icon: selectedNestedItem?.iconName || "File",
  };

  const form = useForm<AddResourceSchema>({
    resolver: zodResolver(addResourceSchema),
    defaultValues,
  });

  const handleSubmit = useCallback(
    async (data: AddResourceSchema) => {
      try {
        updateResourceContent(data);
        handleOpenFormModal(false);
      } catch (error) {
        console.error("Error adding resource:", error);
      }
    },
    [updateResourceContent, handleOpenFormModal]
  );

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    onChange={field.onChange}
                    value={field.value}
                    className="outline-none focus-visible:ring-blue-700 focus-visible:ring-[1px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full outline-none focus-visible:ring-blue-700 focus-visible:ring-[1px]">
                      <SelectValue placeholder="Select Icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(IconMap).map((option) => {
                        const Icon = IconMap[option as keyof typeof IconMap];
                        return (
                          <SelectItem
                            key={option}
                            value={option}
                            className="flex items-center justify-start gap-2"
                          >
                            <Icon />
                            {option}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    disabled={formMode === FormModeType.EDIT}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full outline-none focus-visible:ring-blue-700 focus-visible:ring-[1px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceContent.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.heading}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
