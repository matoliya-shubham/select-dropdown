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
import { ResourceCategoryOptions } from "@/constants/label";

export const AddResourceForm = () => {
  const form = useForm<AddResourceSchema>({
    resolver: zodResolver(addResourceSchema),
    defaultValues: {
      name: "",
      category: undefined,
    },
  });
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
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
            <Button type="submit" className="">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
