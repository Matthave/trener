"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact-form";
import { CONTACT_FORM_OBJECTIVES } from "@/lib/contact-form-objectives";
import { sendContactFormAction } from "@/app/actions/sendContactForm";
import Image from "next/image";
import { SlideUp } from "@/components/animations/SlideUp";

export function ContactFormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      currentState: "",
      primaryObjective: "",
      briefHistory: "",
    },
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLFieldSetElement>(null);
  const selectedObjective = watch("primaryObjective");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    const result = await sendContactFormAction(data);
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      reset();
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <section
      id="contact"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-24 xl:py-32"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-5xl leading-[1.05] font-normal uppercase text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Aplikuj
            </h2>

            <p className="max-w-sm font-body text-sm leading-relaxed text-foreground/60 sm:text-base">
              Liczba miejsc jest ściśle ograniczona, aby zapewnić najwyższą
              jakość współpracy. Prześlij swoje dane, a skontaktuje się z Tobą w
              ciągu 24 godzin.
            </p>

            <div className="flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/50 sm:text-xs">
              <Image
                src="/icons/mail.svg"
                alt=""
                width={20}
                height={20}
                className="invert opacity-50"
              />
              <p>mr.mattfit@gmail.com</p>
            </div>
          </div>

          {/* Right column — form card */}
          <SlideUp delay={0.15} triggerOnScroll>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-foreground/10 bg-foreground/[0.03] p-8 text-center sm:p-12 xl:min-h-[410px]">
                <p className="font-heading text-lg uppercase tracking-[0.15em] text-accent sm:text-xl">
                  Dziękuję!
                </p>
                <p className="max-w-md font-body text-sm leading-relaxed text-foreground/100">
                  Twoje zgłoszenie zostało wysłane. Wkrótce skontaktuję się z
                  Tobą.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="rounded-lg bg-accent p-6 sm:p-10"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                  {/* Full Name */}
                  <fieldset className="flex flex-col gap-2">
                    <label
                      htmlFor="fullName"
                      className="font-heading text-[10px] uppercase tracking-[0.2em] text-background sm:text-xs"
                    >
                      Identyfikacja
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Imię i nazwisko"
                      autoComplete="name"
                      {...register("fullName")}
                      className="border-b border-background/30 bg-transparent pb-2 font-body text-sm text-background outline-none placeholder:text-background/40 transition-colors focus:border-background sm:text-base"
                    />
                    {errors.fullName && (
                      <p className="font-body text-xs text-red-700">
                        {errors.fullName.message}
                      </p>
                    )}
                  </fieldset>

                  {/* Email */}
                  <fieldset className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="font-heading text-[10px] uppercase tracking-[0.2em] text-background sm:text-xs"
                    >
                      Kontakt
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Adres e-mail"
                      autoComplete="email"
                      {...register("email")}
                      className="border-b border-background/30 bg-transparent pb-2 font-body text-sm text-background outline-none placeholder:text-background/40 transition-colors focus:border-background sm:text-base"
                    />
                    {errors.email && (
                      <p className="font-body text-xs text-red-700">
                        {errors.email.message}
                      </p>
                    )}
                  </fieldset>

                  {/* Current State */}
                  <fieldset className="flex flex-col gap-2">
                    <label
                      htmlFor="currentState"
                      className="font-heading text-[10px] uppercase tracking-[0.2em] text-background sm:text-xs"
                    >
                      Aktualny stan
                    </label>
                    <input
                      id="currentState"
                      type="text"
                      placeholder="Wiek / waga / wzrost"
                      {...register("currentState")}
                      className="border-b border-background/30 bg-transparent pb-2 font-body text-sm text-background outline-none placeholder:text-background/40 transition-colors focus:border-background sm:text-base"
                    />
                    {errors.currentState && (
                      <p className="font-body text-xs text-red-700">
                        {errors.currentState.message}
                      </p>
                    )}
                  </fieldset>

                  {/* Primary Objective */}
                  <fieldset
                    className="relative flex flex-col gap-2"
                    ref={dropdownRef}
                  >
                    <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-background sm:text-xs">
                      Główny cel
                    </span>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className={`border-b bg-transparent pb-2 text-left font-body text-sm outline-none transition-colors sm:text-base ${
                        dropdownOpen
                          ? "border-background"
                          : "border-background/30"
                      } ${selectedObjective ? "text-background" : "text-background/40"}`}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                    >
                      {CONTACT_FORM_OBJECTIVES.find(
                        (o) => o.value === selectedObjective,
                      )?.label ?? "Wybierz cel"}
                    </button>

                    {dropdownOpen && (
                      <ul
                        role="listbox"
                        className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-foreground/10 bg-[#1a1a1a] py-2"
                      >
                        {CONTACT_FORM_OBJECTIVES.map((obj) => (
                          <li
                            key={obj.value}
                            role="option"
                            aria-selected={selectedObjective === obj.value}
                            onClick={() => {
                              setValue("primaryObjective", obj.value, {
                                shouldValidate: true,
                              });
                              setDropdownOpen(false);
                            }}
                            className={`cursor-pointer px-4 py-3 font-body text-sm transition-colors sm:text-base ${
                              selectedObjective === obj.value
                                ? "bg-accent/20 text-accent"
                                : "text-foreground hover:bg-accent hover:text-black"
                            }`}
                          >
                            {obj.label}
                          </li>
                        ))}
                      </ul>
                    )}

                    {errors.primaryObjective && (
                      <p className="font-body text-xs text-red-700">
                        {errors.primaryObjective.message}
                      </p>
                    )}
                  </fieldset>

                  {/* Brief History */}
                  <fieldset className="flex flex-col gap-2 sm:col-span-2">
                    <label
                      htmlFor="briefHistory"
                      className="font-heading text-[10px] uppercase tracking-[0.2em] text-background sm:text-xs"
                    >
                      Doświadczenie
                    </label>
                    <textarea
                      id="briefHistory"
                      rows={1}
                      placeholder="Dotychczasowe doświadczenie treningowe"
                      {...register("briefHistory")}
                      className="resize-none border-b border-background/30 bg-transparent pb-2 font-body text-sm text-background outline-none placeholder:text-background/40 transition-colors focus:border-background sm:text-base"
                    />
                    {errors.briefHistory && (
                      <p className="font-body text-xs text-red-700">
                        {errors.briefHistory.message}
                      </p>
                    )}
                  </fieldset>
                </div>

                {submitError && (
                  <p className="mt-6 font-body text-xs text-red-800 sm:text-sm">
                    {submitError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full cursor-pointer rounded-sm border border-background/20 bg-background py-4 font-heading text-xs uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                >
                  {isSubmitting ? "Wysyłanie…" : "Wyślij zgłoszenie"}
                </button>
              </form>
            )}
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
