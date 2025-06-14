
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface Worker {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  site: string;
  status: string;
  lastSeen: string;
  avatar: string;
}

interface EditWorkerDialogProps {
  worker: Worker | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (worker: Worker) => void;
}

export const EditWorkerDialog = ({ worker, isOpen, onClose, onSave }: EditWorkerDialogProps) => {
  const form = useForm({
    defaultValues: {
      name: worker?.name || "",
      role: worker?.role || "",
      email: worker?.email || "",
      phone: worker?.phone || "",
      site: worker?.site || "",
    },
  });

  const handleSubmit = (data: any) => {
    if (worker) {
      const updatedWorker = {
        ...worker,
        ...data,
      };
      onSave(updatedWorker);
      toast({
        title: "Worker Updated",
        description: `${data.name}'s information has been updated successfully.`,
      });
      onClose();
    }
  };

  // Reset form when worker changes
  React.useEffect(() => {
    if (worker) {
      form.reset({
        name: worker.name,
        role: worker.role,
        email: worker.email,
        phone: worker.phone,
        site: worker.site,
      });
    }
  }, [worker, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Worker</DialogTitle>
          <DialogDescription>
            Update the worker's information below.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter worker name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter site location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
