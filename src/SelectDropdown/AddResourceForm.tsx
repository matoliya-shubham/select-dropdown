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
import {
  IconMap,
  ResourceCategoryOptions,
  toastMessages,
} from "@/constants/label";
import { useResourceContext } from "@/hooks/useResourceContext";
import { useResourceContentService } from "@/services/useResourceContentService";
import { toast } from "sonner";
import { FormModeType } from "@/types/DropdownContentType";

export const AddResourceForm = () => {
  const {
    displayContent,
    fetchResources,
    selectedItem,
    formMode,
    _onOpenFormModal,
    isLoading,
    setIsLoading,
  } = useResourceContext();

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
  const { updateResourceContent } = useResourceContentService();

  const handleSubmit = async (data: AddResourceSchema) => {
    try {
      setIsLoading(true);
      const itemToAdd = displayContent.find(
        (item) => item.id === data.category
      );
      const nestedContent =
        formMode === FormModeType.EDIT
          ? itemToAdd?.nestedContent.filter(
              (nestedItem) => nestedItem.id !== nestedItemId
            ) || []
          : itemToAdd?.nestedContent || [];
      await updateResourceContent({
        id: itemToAdd?.id || "",
        parentId: itemToAdd?.parentId || "",
        heading: itemToAdd?.heading || "",
        nestedContent: [
          ...nestedContent,
          {
            title: data.name,
            id: crypto.randomUUID() || "",
            hasContent: false,
            iconName: data.icon,
            tooltipContent: "",
          },
        ],
      });
      fetchResources();
      toast.success(
        formMode === FormModeType.EDIT
          ? toastMessages.updateResourceSuccess
          : toastMessages.addResourceSuccess,
        {
          position: "top-center",
        }
      );
      _onOpenFormModal(false);
    } catch (error) {
      console.error("Error adding resource:", error);
      toast.error(
        formMode === FormModeType.EDIT
          ? toastMessages.updateResourceError
          : toastMessages.addResourceError,
        {
          position: "top-center",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full outline-none focus-visible:ring-blue-700 focus-visible:ring-[1px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {ResourceCategoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
