import {
  ArrowLeftIcon,
  AtSymbolIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Extracted components to avoid creating components during render
const CodeBlock: React.FC<{
  code: string;
  _language?: string;
  copyKey: string;
  copiedStates: { [key: string]: boolean };
  copyToClipboard: (text: string, key: string) => void;
}> = ({ code, _language = "tsx", copyKey, copiedStates, copyToClipboard }) => {
  const { t } = useTranslation("inputs");
  return (
    <div className="relative">
      <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, copyKey)}
        className="absolute top-3 right-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded text-xs transition-colors"
      >
        {copiedStates[copyKey] ? t("code.copied") : t("code.copy")}
      </button>
    </div>
  );
};

const SectionHeader: React.FC<{
  id: string;
  title: string;
  description: string;
  expandedSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;
}> = ({ id, title, description, expandedSections, toggleSection }) => (
  <div className="mb-8">
    <button
      onClick={() => toggleSection(id)}
      className="flex items-center justify-between w-full text-left mb-4"
    >
      <h2 className={`${textVariants.heading.h2()}`}>{title}</h2>
      {expandedSections[id] ? (
        <ChevronUpIcon className="h-6 w-6 text-muted-foreground" />
      ) : (
        <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
      )}
    </button>
    {expandedSections[id] && (
      <p className={`${textVariants.body.lg()} text-muted-foreground mb-6`}>
        {description}
      </p>
    )}
  </div>
);

const InputsPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const { t } = useTranslation("inputs");
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    "quick-start": true,
    variants: true,
    sizes: true,
    states: true,
    web3: true,
    patterns: true,
    accessibility: true,
  });

  // Demo form states
  const [demoValues, setDemoValues] = useState({
    email: "",
    password: "",
    search: "",
    message: "",
    wallet: "",
    amount: "",
    phone: "",
    website: "",
    date: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [validations, setValidations] = useState<{ [key: string]: boolean }>(
    {},
  );

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDemoInput = (field: string, value: string) => {
    setDemoValues((prev) => ({ ...prev, [field]: value }));

    // Simple validation examples
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: t("validation.emailInvalid"),
        }));
        setValidations((prev) => ({ ...prev, email: false }));
      } else if (value) {
        setErrors((prev) => ({ ...prev, email: "" }));
        setValidations((prev) => ({ ...prev, email: true }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
        setValidations((prev) => ({ ...prev, email: false }));
      }
    }

    if (field === "wallet") {
      const ethRegex = /^0x[a-fA-F0-9]{40}$/;
      if (value && !ethRegex.test(value) && value.length > 10) {
        setErrors((prev) => ({
          ...prev,
          wallet: t("validation.walletInvalid"),
        }));
        setValidations((prev) => ({ ...prev, wallet: false }));
      } else if (value && ethRegex.test(value)) {
        setErrors((prev) => ({ ...prev, wallet: "" }));
        setValidations((prev) => ({ ...prev, wallet: true }));
      } else {
        setErrors((prev) => ({ ...prev, wallet: "" }));
        setValidations((prev) => ({ ...prev, wallet: false }));
      }
    }
  };

  return (
    <>
      <SEOHead
        title={t("seo.title", { emailDomain })}
        description={t("seo.description")}
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <PencilSquareIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-primary font-semibold">
                {t("header.badge")}
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              {t("header.title")}
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}
            >
              {t("header.intro")}
            </p>

            {/* Input Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-primary mb-1`}
                >
                  8
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.inputTypes")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-success mb-1`}
                >
                  3
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.sizeOptions")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-warning mb-1`}
                >
                  4
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.stateTypes")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-info mb-1`}>
                  6
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.web3Patterns")}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              id="quick-start"
              title={t("sections.quickStart.title")}
              description={t("sections.quickStart.description")}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />

            {expandedSections["quick-start"] && (
              <div className="space-y-8">
                {/* Basic Input Types */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.essentialTitle")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.emailLabel")}
                      </label>
                      <input
                        type="email"
                        className={variants.input.default()}
                        placeholder={t("placeholders.email")}
                        value={demoValues.email}
                        onChange={(e) =>
                          handleDemoInput("email", e.target.value)
                        }
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1 flex items-center">
                          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                      {validations.email && (
                        <p className="text-sm text-success mt-1 flex items-center">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          {t("validation.emailValid")}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.passwordLabel")}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={variants.input.default()}
                          placeholder={t("quickStart.passwordPlaceholder")}
                          value={demoValues.password}
                          onChange={(e) =>
                            handleDemoInput("password", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.searchLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                          type="text"
                          className={variants.input.withIcon()}
                          placeholder={t("quickStart.searchPlaceholder")}
                          value={demoValues.search}
                          onChange={(e) =>
                            handleDemoInput("search", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.messageLabel")}
                      </label>
                      <textarea
                        className={variants.input.default()}
                        placeholder={t("quickStart.messagePlaceholder")}
                        rows={3}
                        value={demoValues.message}
                        onChange={(e) =>
                          handleDemoInput("message", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <CodeBlock
                    copyKey="essential-inputs"
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    code={`import { variants } from '@sudobility/design';

// Basic input types
<input
  type="email"
  className={variants.input.default()}
  placeholder="user@example.com"
/>

// Password input with toggle
<div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    className={variants.input.default()}
    placeholder="Enter your password"
  />
  <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
  </button>
</div>

// Search input with icon
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
  </div>
  <input
    type="text"
    className={variants.input.withIcon()}
    placeholder="Search messages..."
  />
</div>

// Textarea
<textarea
  className={variants.input.default()}
  placeholder="Type your message..."
  rows={3}
/>`}
                  />
                </div>

                {/* Input Sizes */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.sizesTitle")}
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.smallLabel")}
                      </label>
                      <input
                        type="text"
                        className={variants.input.small()}
                        placeholder={t("quickStart.smallPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.defaultLabel")}
                      </label>
                      <input
                        type="text"
                        className={variants.input.default()}
                        placeholder={t("quickStart.defaultPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.largeLabel")}
                      </label>
                      <input
                        type="text"
                        className={variants.input.large()}
                        placeholder={t("quickStart.largePlaceholder")}
                      />
                    </div>
                  </div>

                  <CodeBlock
                    copyKey="input-sizes"
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    code={`import { variants } from '@sudobility/design';

// Input size variations
<input className={variants.input.small()} placeholder="Small size input" />
<input className={variants.input.default()} placeholder="Default size input" />
<input className={variants.input.large()} placeholder="Large size input" />`}
                  />
                </div>

                {/* Error State */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.validationTitle")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.errorStateLabel")}
                      </label>
                      <input
                        type="email"
                        className={variants.input.error()}
                        placeholder={t("placeholders.invalidEmail")}
                        value="invalid-email"
                      />
                      <p className="text-sm text-destructive mt-1 flex items-center">
                        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                        {t("validation.emailInvalid")}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.successStateLabel")}
                      </label>
                      <input
                        type="email"
                        className={
                          variants.input.default() +
                          " border-success focus:border-success focus:ring-success"
                        }
                        placeholder={t("placeholders.email")}
                        value="user@example.com"
                      />
                      <p className="text-sm text-success mt-1 flex items-center">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        {t("validation.emailValid")}
                      </p>
                    </div>
                  </div>

                  <CodeBlock
                    copyKey="validation-states"
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    code={`import { variants } from '@sudobility/design';

// Error state input
<input
  className={variants.input.error()}
  placeholder="invalid-email"
/>
<p className="text-sm text-destructive mt-1 flex items-center">
  <ExclamationCircleIcon className="h-4 w-4 mr-1" />
  Please enter a valid email address
</p>

// Success state (custom styling)
<input
  className={variants.input.default() + ' border-success focus:border-success focus:ring-success'}
  value="user@example.com"
/>
<p className="text-sm text-success mt-1 flex items-center">
  <CheckCircleIcon className="h-4 w-4 mr-1" />
  Valid email address
</p>`}
                  />
                </div>

                {/* Web3 Inputs */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.web3Title")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.walletLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="w-5 h-5 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                            Ξ
                          </div>
                        </div>
                        <input
                          type="text"
                          className={variants.input.withIcon()}
                          placeholder="0x742d35Cc6434C0532925a3b8D665d4E0f3c"
                          value={demoValues.wallet}
                          onChange={(e) =>
                            handleDemoInput("wallet", e.target.value)
                          }
                        />
                      </div>
                      {errors.wallet && (
                        <p className="text-sm text-destructive mt-1 flex items-center">
                          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                          {errors.wallet}
                        </p>
                      )}
                      {validations.wallet && (
                        <p className="text-sm text-success mt-1 flex items-center">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          {t("validation.walletValid")}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("quickStart.amountLabel")}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.000000000000000001"
                          className={variants.input.default()}
                          placeholder="0.0"
                          value={demoValues.amount}
                          onChange={(e) =>
                            handleDemoInput("amount", e.target.value)
                          }
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <span className="text-sm text-muted-foreground">
                            ETH
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("quickStart.amountBalance")}
                      </p>
                    </div>
                  </div>

                  <CodeBlock
                    copyKey="web3-inputs"
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    code={`// Wallet address input with Ethereum icon
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <div className="w-5 h-5 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
      Ξ
    </div>
  </div>
  <input
    type="text"
    className={variants.input.withIcon()}
    placeholder="0x742d35Cc6434C0532925a3b8D665d4E0f3c"
  />
</div>

// Token amount input with currency suffix
<div className="relative">
  <input
    type="number"
    step="0.000000000000000001"
    className={variants.input.default()}
    placeholder="0.0"
  />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
    <span className="text-sm text-muted-foreground">ETH</span>
  </div>
</div>`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input Variants Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              id="variants"
              title={t("sections.variants.title")}
              description={t("sections.variants.description")}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />

            {expandedSections["variants"] && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Standard Variants */}
                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>
                      {t("variants.standardTitle")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.defaultLabel")}
                        </label>
                        <input
                          type="text"
                          className={variants.input.default()}
                          placeholder={t("variants.defaultPlaceholder")}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("variants.defaultHint")}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.searchLabel")}
                        </label>
                        <input
                          type="search"
                          className={variants.input.search()}
                          placeholder={t("variants.searchPlaceholder")}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("variants.searchHint")}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.errorLabel")}
                        </label>
                        <input
                          type="text"
                          className={variants.input.error()}
                          placeholder={t("variants.errorPlaceholder")}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("variants.errorHint")}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.iconLabel")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AtSymbolIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="email"
                            className={variants.input.withIcon()}
                            placeholder={t("placeholders.emailWithIcon")}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("variants.iconHint")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Specialized Inputs */}
                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>
                      {t("variants.specializedTitle")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.phoneLabel")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="tel"
                            className={variants.input.withIcon()}
                            placeholder={t("placeholders.phone")}
                            value={demoValues.phone}
                            onChange={(e) =>
                              handleDemoInput("phone", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.urlLabel")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LinkIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="url"
                            className={variants.input.withIcon()}
                            placeholder={t("placeholders.website")}
                            value={demoValues.website}
                            onChange={(e) =>
                              handleDemoInput("website", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.dateLabel")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="date"
                            className={variants.input.withIcon()}
                            value={demoValues.date}
                            onChange={(e) =>
                              handleDemoInput("date", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("variants.fileLabel")}
                        </label>
                        <input
                          type="file"
                          className={
                            variants.input.default() +
                            " file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  copyKey="all-input-variants"
                  copiedStates={copiedStates}
                  copyToClipboard={copyToClipboard}
                  code={`import { variants } from '@sudobility/design';


// All input variants
<input className={variants.input.default()} placeholder="Default input" />
<input className={variants.input.search()} placeholder="Search input" />
<input className={variants.input.error()} placeholder="Error state" />

// Size variants
<input className={variants.input.small()} placeholder="Small input" />
<input className={variants.input.large()} placeholder="Large input" />

// With icon variant
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
    <AtSymbolIcon className="h-5 w-5 text-muted-foreground" />
  </div>
  <input className={variants.input.withIcon()} placeholder="With icon" />
</div>`}
                />
              </div>
            )}
          </div>

          {/* Web3 Patterns Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              id="web3"
              title={t("sections.web3.title")}
              description={t("sections.web3.description")}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />

            {expandedSections["web3"] && (
              <div className="space-y-8">
                {/* Wallet Address Patterns */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("web3.walletInputsTitle")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.ethAddressLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="w-5 h-5 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                            Ξ
                          </div>
                        </div>
                        <input
                          type="text"
                          className={variants.input.withIcon()}
                          placeholder="0x742d35Cc6434C0532925a3b8D665d4E0f3c"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.solAddressLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="w-5 h-5 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-xs text-secondary-foreground font-bold">
                            ◎
                          </div>
                        </div>
                        <input
                          type="text"
                          className={variants.input.withIcon()}
                          placeholder="9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.ensLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                          type="text"
                          className={variants.input.withIcon()}
                          placeholder="alice.eth"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <span className={variants.badge.small("primary")}>
                            ENS
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.snsLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                          type="text"
                          className={variants.input.withIcon()}
                          placeholder="alice.sol"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <span className={variants.badge.small("solana")}>
                            SNS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Token Amount Inputs */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("web3.tokenAmountsTitle")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.ethAmountLabel")}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.000000000000000001"
                          className={variants.input.default()}
                          placeholder="0.0"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                          <button className="text-xs text-primary hover:text-primary/80 font-medium">
                            {t("web3.max")}
                          </button>
                          <span className="text-sm text-muted-foreground">
                            ETH
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>≈ $3,247.82 USD</span>
                        <span>{t("web3.ethBalance")}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.usdcAmountLabel")}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          className={variants.input.default()}
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                          <button className="text-xs text-primary hover:text-primary/80 font-medium">
                            {t("web3.max")}
                          </button>
                          <span className="text-sm text-muted-foreground">
                            USDC
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>≈ $1,000.00 USD</span>
                        <span>{t("web3.usdcBalance")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gas Fee Inputs */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("web3.gasTitle")}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.gasPriceLabel")}
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 border border-input rounded-lg text-left hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring">
                          <div className="text-sm font-medium">
                            {t("web3.gasSlow")}
                          </div>
                          <div className="text-lg font-semibold">20 Gwei</div>
                          <div className="text-xs text-muted-foreground">
                            {t("web3.gasSlowTime")}
                          </div>
                        </button>
                        <button className="p-3 border-2 border-primary bg-primary/10 rounded-lg text-left">
                          <div className="text-sm font-medium text-primary">
                            {t("web3.gasStandard")}
                          </div>
                          <div className="text-lg font-semibold">35 Gwei</div>
                          <div className="text-xs text-muted-foreground">
                            {t("web3.gasStandardTime")}
                          </div>
                        </button>
                        <button className="p-3 border border-input rounded-lg text-left hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring">
                          <div className="text-sm font-medium">
                            {t("web3.gasFast")}
                          </div>
                          <div className="text-lg font-semibold">50 Gwei</div>
                          <div className="text-xs text-muted-foreground">
                            {t("web3.gasFastTime")}
                          </div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("web3.customGasLabel")}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          className={variants.input.default()}
                          placeholder="35.0"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <span className="text-sm text-muted-foreground">
                            Gwei
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("web3.customGasHint")}
                      </p>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  copyKey="web3-patterns"
                  copiedStates={copiedStates}
                  copyToClipboard={copyToClipboard}
                  code={`// Ethereum address input
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <div className="w-5 h-5 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
      Ξ
    </div>
  </div>
  <input
    className={variants.input.withIcon()}
    placeholder="0x742d35Cc6434C0532925a3b8D665d4E0f3c"
  />
</div>

// Token amount with MAX button
<div className="relative">
  <input
    type="number"
    step="0.000000000000000001"
    className={variants.input.default()}
    placeholder="0.0"
  />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
    <button className="text-xs text-primary hover:text-primary/80 font-medium">
      MAX
    </button>
    <span className="text-sm text-muted-foreground">ETH</span>
  </div>
</div>

// ENS domain with badge
<div className="relative">
  <input className={variants.input.withIcon()} placeholder="alice.eth" />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
    <span className={variants.badge.small('primary')}>ENS</span>
  </div>
</div>`}
                />
              </div>
            )}
          </div>

          {/* Accessibility Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              id="accessibility"
              title={t("sections.accessibility.title")}
              description={t("sections.accessibility.description")}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />

            {expandedSections["accessibility"] && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>
                      {t("accessibility.bestPracticesTitle")}
                    </h3>
                    <ul className="space-y-3">
                      {(
                        t("accessibility.bestPractices", {
                          returnObjects: true,
                        }) as string[]
                      ).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>
                      {t("accessibility.avoidTitle")}
                    </h3>
                    <ul className="space-y-3">
                      {(
                        t("accessibility.avoid", {
                          returnObjects: true,
                        }) as string[]
                      ).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <ExclamationCircleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("accessibility.examplesTitle")}
                  </h3>
                  <CodeBlock
                    copyKey="accessibility-examples"
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    code={`// Proper label association
<label htmlFor="email-input" className="block text-sm font-medium mb-2">
  Email Address
</label>
<input
  id="email-input"
  type="email"
  className={variants.input.default()}
  placeholder="user@example.com"
  aria-describedby="email-help"
  required
/>
<p id="email-help" className="text-xs text-muted-foreground mt-1">
  We'll use this email to send you important updates
</p>

// Error state with ARIA attributes
<label htmlFor="password-input" className="block text-sm font-medium mb-2">
  Password
</label>
<input
  id="password-input"
  type="password"
  className={variants.input.error()}
  aria-invalid="true"
  aria-describedby="password-error"
  required
/>
<p id="password-error" className="text-sm text-destructive mt-1" role="alert">
  Password must be at least 8 characters long
</p>

// Search input with proper roles
<div role="search">
  <label htmlFor="search-input" className="sr-only">
    Search messages
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
    </div>
    <input
      id="search-input"
      type="search"
      className={variants.input.withIcon()}
      placeholder="Search messages..."
      aria-label="Search through your messages"
    />
  </div>
</div>`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Back Navigation */}
          <div className="flex items-center justify-between pt-8 border-t">
            <LocalizedLink
              to="/design"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              {t("nav.back")}
            </LocalizedLink>

            <div className="text-sm text-muted-foreground">
              {t("nav.lastUpdated", {
                date: new Date().toLocaleDateString(),
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputsPage;
