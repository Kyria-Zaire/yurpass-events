"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { applicationSchema, type ApplicationFormData } from "@/lib/schemas";

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(data: ApplicationFormData) {
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual Supabase/Airtable integration
    console.log("Application submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black mb-4">
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-lg font-bold text-black mb-2">
          Candidature envoyée
        </h3>
        <p className="text-sm text-gray-600">
          Nous reviendrons vers vous dans les <span className="font-semibold text-black">48h</span>.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black font-medium">Nom complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Prénom Nom"
                  className="h-10 text-sm bg-white border-gray-200 focus:border-black focus:ring-black/5 rounded-lg transition-colors"
                  {...field}
                />
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
              <FormLabel className="text-sm text-black font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="vous@exemple.com"
                  className="h-10 text-sm bg-white border-gray-200 focus:border-black focus:ring-black/5 rounded-lg transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 text-sm font-semibold bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-200 group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi...
            </>
          ) : (
            <>
              Demander une invitation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-gray-500">
          Places limitées à <span className="font-semibold text-black">15 personnes</span>
        </p>
      </form>
    </Form>
  );
}
