import {
  CheckCircleIcon,
  ClipboardDocumentIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  PaperClipIcon,
  ShieldCheckIcon,
  TrashIcon,
  WalletIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@sudobility/seo_lib";
import {
  Button,
  Input,
  Label,
  Section,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sudobility/components";
import { cn } from "@sudobility/components";
import { textVariants, ui } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

interface FormStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

const FormsAdvancedPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("formsAdvanced");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    walletAddress: "",
    tokenAmount: "",
    gasPrice: "",
    network: "ethereum",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const steps: FormStep[] = [
    {
      id: 1,
      title: t("steps.account.title"),
      description: t("steps.account.description"),
      completed: false,
      current: currentStep === 1,
    },
    {
      id: 2,
      title: t("steps.wallet.title"),
      description: t("steps.wallet.description"),
      completed: false,
      current: currentStep === 2,
    },
    {
      id: 3,
      title: t("steps.transaction.title"),
      description: t("steps.transaction.description"),
      completed: false,
      current: currentStep === 3,
    },
    {
      id: 4,
      title: t("steps.review.title"),
      description: t("steps.review.description"),
      completed: false,
      current: currentStep === 4,
    },
  ];

  const quickStartExamples = [
    {
      title: t("quickStart.examples.multiStep.title"),
      description: t("quickStart.examples.multiStep.description"),
      code: `// Multi-Step Form — semantic tokens auto-adapt to theme
{steps.map((step, index) => (
  <div key={step.id} className="flex flex-col items-center flex-1">
    <div className={cn(
      'w-10 h-10 rounded-full flex items-center justify-center border-2',
      step.completed
        ? 'bg-success/10 border-success text-success'          // done
        : step.current
          ? 'bg-primary/10 border-primary text-primary'        // active
          : 'bg-muted border-input text-muted-foreground'      // upcoming
    )}>
      {step.completed ? <CheckCircleIcon className="h-5 w-5" /> : <span>{step.id}</span>}
    </div>
    <div className={cn('text-sm font-medium', step.current ? 'text-primary' : 'text-muted-foreground')}>
      {step.title}
    </div>
    <div className="text-xs text-muted-foreground">{step.description}</div>
  </div>
))}`,
    },
    {
      title: t("quickStart.examples.fileUpload.title"),
      description: t("quickStart.examples.fileUpload.description"),
      code: `// File Upload Zone — semantic tokens, no dark: overrides needed
<div
  className={cn(
    'border-2 border-dashed rounded-lg p-8 text-center',
    dragOver
      ? 'border-primary bg-primary/10'                       // active drop target
      : 'border-input hover:border-muted-foreground'
  )}
  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
  onDragLeave={() => setDragOver(false)}
  onDrop={(e) => { e.preventDefault(); setDragOver(false); /* Handle file drop */ }}
>
  <CloudArrowUpIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
  <p className="text-lg font-medium text-foreground mb-2">Drop files here to upload</p>
  <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.jpg,.png" />
</div>`,
    },
    {
      title: t("quickStart.examples.tokenAmount.title"),
      description: t("quickStart.examples.tokenAmount.description"),
      code: `// Token Amount Input — Input uses variants.input.* under the hood
<Label className="text-sm font-medium text-foreground">Amount to Send</Label>
<div className="flex rounded-md shadow-sm">
  <Input
    type="number"
    placeholder="0.00"
    className="rounded-r-none font-mono"
    step="0.000000000000000001"
    min="0"
  />
  {/* token symbol addon → border-input + bg-muted + text-muted-foreground */}
  <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
    ETH
  </div>
</div>
<div className="text-muted-foreground text-sm">Balance: 1.234567 ETH ($2,468.90)</div>
<Button variant="outline" size="sm">Max</Button>`,
    },
    {
      title: t("quickStart.examples.validation.title"),
      description: t("quickStart.examples.validation.description"),
      code: `// Advanced Validation — intent tokens (destructive/success) instead of red/green
<Label className="text-sm font-medium text-foreground">Wallet Address</Label>
<div className="relative">
  <Input
    type="text"
    placeholder="0x..."
    className={cn(
      errors.walletAddress && 'border-destructive pr-10',           // error state
      !errors.walletAddress && formData.walletAddress && 'border-success pr-10' // valid state
    )}
  />
  {!errors.walletAddress && formData.walletAddress && (
    <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
  )}
  {errors.walletAddress && (
    <XCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
  )}
</div>
{errors.walletAddress && (
  <p className="mt-1 text-sm text-destructive">{errors.walletAddress}</p>
)}`,
    },
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setUploadedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateWalletAddress = (address: string) => {
    if (!address) return "";
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return t("validationMessages.invalidAddress");
    }
    return "";
  };

  const validateTokenAmount = (amount: string) => {
    if (!amount) return "";
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return t("validationMessages.positiveAmount");
    }
    if (Number(amount) > 1.234567) {
      return t("validationMessages.insufficientBalance");
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "";
    if (password.length < 8) {
      return t("validationMessages.passwordMinLength");
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return t("validationMessages.passwordComplexity");
    }
    return "";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    let error = "";
    switch (field) {
      case "walletAddress":
        error = validateWalletAddress(value);
        break;
      case "tokenAmount":
        error = validateTokenAmount(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error =
          value !== formData.password
            ? t("validationMessages.passwordsDoNotMatch")
            : "";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
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
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <DocumentTextIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-primary font-semibold">
                {t("header.badge")}
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              {t("header.title")}
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl text-muted-foreground`}
            >
              {t("header.description")}
            </p>
          </div>

          {/* Quick Start Examples */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("quickStart.heading")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {quickStartExamples.map((example, index) => (
                <div
                  key={index}
                  className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
                >
                  <div className="p-6 border-b border-border">
                    <h3 className={`${textVariants.heading.h4()} mb-2`}>
                      {example.title}
                    </h3>
                    <p
                      className={`${textVariants.body.sm()} text-muted-foreground`}
                    >
                      {example.description}
                    </p>
                  </div>
                  <div className="relative">
                    <pre className="p-4 text-sm overflow-x-auto bg-muted max-h-96">
                      <code className="text-foreground">{example.code}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(example.code)}
                      className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground bg-card rounded-md shadow-sm border border-border hover:bg-muted transition-colors"
                      title={t("quickStart.copyTitle")}
                    >
                      <ClipboardDocumentIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Multi-Step Form Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("multiStep.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("multiStep.cardTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("multiStep.cardDescription")}
                </p>
              </div>

              <div className="p-6">
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                              step.completed
                                ? "bg-success/10 border-success text-success"
                                : step.current
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "bg-muted border-input text-muted-foreground",
                            )}
                          >
                            {step.completed ? (
                              <CheckCircleIcon className="h-5 w-5" />
                            ) : (
                              <span>{step.id}</span>
                            )}
                          </div>
                          <div className="mt-2 text-center">
                            <div
                              className={cn(
                                "text-sm font-medium",
                                step.current
                                  ? "text-primary"
                                  : "text-muted-foreground",
                              )}
                            >
                              {step.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {step.description}
                            </div>
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={cn(
                              "flex-1 h-px mt-5",
                              steps[index + 1].completed || step.completed
                                ? "bg-success/40"
                                : "bg-muted",
                            )}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div className="min-h-[300px]">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {t("multiStep.emailLabel")}
                        </Label>
                        <Input
                          type="email"
                          placeholder={t("multiStep.emailPlaceholder")}
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {t("multiStep.passwordLabel")}
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={t("multiStep.passwordPlaceholder")}
                            value={formData.password}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleInputChange("password", e.target.value)}
                            className={cn(
                              errors.password && "border-destructive",
                            )}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <EyeIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {t("multiStep.confirmPasswordLabel")}
                        </Label>
                        <Input
                          type="password"
                          placeholder={t(
                            "multiStep.confirmPasswordPlaceholder",
                          )}
                          value={formData.confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className={cn(
                            "mt-1",
                            errors.confirmPassword && "border-destructive",
                          )}
                        />
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {t("multiStep.walletAddressLabel")}
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            type="text"
                            placeholder={t(
                              "multiStep.walletAddressPlaceholder",
                            )}
                            value={formData.walletAddress}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              handleInputChange("walletAddress", e.target.value)
                            }
                            className={cn(
                              errors.walletAddress &&
                                "border-destructive pr-10",
                              !errors.walletAddress &&
                                formData.walletAddress &&
                                "border-success pr-10",
                            )}
                          />
                          {!errors.walletAddress && formData.walletAddress && (
                            <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-success" />
                          )}
                          {errors.walletAddress && (
                            <XCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
                          )}
                        </div>
                        {errors.walletAddress && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.walletAddress}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {t("multiStep.networkLabel")}
                        </Label>
                        <Select
                          value={formData.network}
                          onValueChange={(value) =>
                            handleInputChange("network", value)
                          }
                        >
                          <SelectTrigger className="mt-1 block w-full h-10 px-3 rounded-md border-input bg-card text-foreground shadow-sm focus:outline-none focus:border-ring focus:ring-ring">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ethereum">
                              {t("multiStep.networks.ethereum")}
                            </SelectItem>
                            <SelectItem value="polygon">
                              {t("multiStep.networks.polygon")}
                            </SelectItem>
                            <SelectItem value="bsc">
                              {t("multiStep.networks.bsc")}
                            </SelectItem>
                            <SelectItem value="arbitrum">
                              {t("multiStep.networks.arbitrum")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {t("multiStep.tokenAmountLabel")}
                        </Label>
                        <div className="relative mt-1">
                          <div className="flex rounded-md shadow-sm">
                            <Input
                              type="number"
                              placeholder={t(
                                "multiStep.tokenAmountPlaceholder",
                              )}
                              value={formData.tokenAmount}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) =>
                                handleInputChange("tokenAmount", e.target.value)
                              }
                              className={cn(
                                "rounded-r-none",
                                errors.tokenAmount && "border-destructive",
                              )}
                              step="0.000000000000000001"
                              min="0"
                            />
                            <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                              ETH
                            </div>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t("multiStep.balance")}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleInputChange("tokenAmount", "1.234567")
                            }
                          >
                            {t("multiStep.max")}
                          </Button>
                        </div>
                        {errors.tokenAmount && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.tokenAmount}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {t("multiStep.gasPriceLabel")}
                        </Label>
                        <Input
                          type="number"
                          placeholder={t("multiStep.gasPricePlaceholder")}
                          value={formData.gasPrice}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("gasPrice", e.target.value)
                          }
                          className="mt-1"
                          min="1"
                        />
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t("multiStep.gasPriceHint")}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-muted rounded-lg p-6">
                        <h4 className="font-medium text-foreground mb-4">
                          {t("multiStep.reviewTitle")}
                        </h4>
                        <dl className="space-y-3">
                          <div className="flex justify-between">
                            <dt className="text-sm text-muted-foreground">
                              {t("multiStep.reviewNetwork")}
                            </dt>
                            <dd className="text-sm font-medium text-foreground capitalize">
                              {formData.network}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm text-muted-foreground">
                              {t("multiStep.reviewToAddress")}
                            </dt>
                            <dd className="text-sm font-mono text-foreground">
                              {formData.walletAddress}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm text-muted-foreground">
                              {t("multiStep.reviewAmount")}
                            </dt>
                            <dd className="text-sm font-medium text-foreground">
                              {formData.tokenAmount} ETH
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm text-muted-foreground">
                              {t("multiStep.reviewGasPrice")}
                            </dt>
                            <dd className="text-sm font-medium text-foreground">
                              {formData.gasPrice || "20"} Gwei
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="bg-warning/10 border border-warning rounded-lg p-4">
                        <div className="flex">
                          <ExclamationTriangleIcon className="h-5 w-5 text-warning mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-warning">
                              {t("multiStep.warningTitle")}
                            </h5>
                            <p className="mt-1 text-sm text-warning">
                              {t("multiStep.warningBody")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    {t("multiStep.previous")}
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentStep < 4) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                    disabled={currentStep === 4}
                  >
                    {currentStep === 4
                      ? t("multiStep.submit")
                      : t("multiStep.next")}
                  </Button>
                </div>
              </div>
            </div>
          </Section>

          {/* File Upload Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("fileUpload.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("fileUpload.cardTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("fileUpload.cardDescription")}
                </p>
              </div>

              <div className="p-6">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                    dragOver
                      ? "border-primary bg-primary/10"
                      : "border-input hover:border-muted-foreground",
                  )}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFileUpload(e.dataTransfer.files);
                  }}
                >
                  <CloudArrowUpIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    {t("fileUpload.dropTitle")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("fileUpload.dropSubtitle")}
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-input rounded-md shadow-sm text-sm font-medium text-foreground bg-card hover:bg-muted cursor-pointer"
                  >
                    <PaperClipIcon className="h-4 w-4 mr-2" />
                    {t("fileUpload.chooseFiles")}
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t("fileUpload.supportedFormats")}
                  </p>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      {t("fileUpload.uploadedFiles", {
                        count: uploadedFiles.length,
                      })}
                    </h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-info/10 rounded flex items-center justify-center mr-3">
                              <DocumentTextIcon className="h-4 w-4 text-info" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t("fileUpload.megabytes", {
                                  size: (file.size / 1024 / 1024).toFixed(2),
                                })}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* Web3 Inputs Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("web3.heading")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Wallet Address Input */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>
                    {t("web3.walletCard.title")}
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    {t("web3.walletCard.description")}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      <WalletIcon className="h-4 w-4 inline mr-1" />
                      {t("web3.walletCard.recipientLabel")}
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder={t("web3.walletCard.recipientPlaceholder")}
                        className="font-mono text-sm"
                        value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CheckCircleIcon className="h-4 w-4 text-success" />
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-success">
                      {t("web3.walletCard.validAddress")}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      <GlobeAltIcon className="h-4 w-4 inline mr-1" />
                      {t("web3.walletCard.ensLabel")}
                    </Label>
                    <Input
                      type="text"
                      placeholder={t("web3.walletCard.ensPlaceholder")}
                      className="font-mono text-sm"
                      value="alice.eth"
                    />
                    <p className="mt-1 text-xs text-info">
                      {t("web3.walletCard.ensResolves")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Token Amount Input */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>
                    {t("web3.tokenCard.title")}
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    {t("web3.tokenCard.description")}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      <CurrencyDollarIcon className="h-4 w-4 inline mr-1" />
                      {t("web3.tokenCard.amountLabel")}
                    </Label>
                    <div className="flex rounded-md shadow-sm">
                      <Input
                        type="number"
                        placeholder={t("web3.tokenCard.amountPlaceholder")}
                        className="rounded-r-none font-mono"
                        step="0.000000000000000001"
                        min="0"
                        value="0.5"
                      />
                      <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm font-medium">
                        ETH
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("web3.tokenCard.balance")}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          {t("web3.tokenCard.quarter")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("web3.tokenCard.half")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("web3.tokenCard.threeQuarters")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("web3.tokenCard.max")}
                        </Button>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t("web3.tokenCard.usdEquivalent")}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      <ShieldCheckIcon className="h-4 w-4 inline mr-1" />
                      {t("web3.tokenCard.gasSettingsLabel")}
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="p-2 text-center border rounded-md border-success bg-success/10">
                        <div className="text-xs font-medium text-success">
                          {t("web3.tokenCard.gasSlow")}
                        </div>
                        <div className="text-xs text-success">
                          {t("web3.tokenCard.gasSlowValue")}
                        </div>
                      </button>
                      <button className="p-2 text-center border rounded-md border-primary bg-primary/10">
                        <div className="text-xs font-medium text-primary">
                          {t("web3.tokenCard.gasStandard")}
                        </div>
                        <div className="text-xs text-primary">
                          {t("web3.tokenCard.gasStandardValue")}
                        </div>
                      </button>
                      <button className="p-2 text-center border rounded-md border-input">
                        <div className="text-xs font-medium text-foreground">
                          {t("web3.tokenCard.gasFast")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("web3.tokenCard.gasFastValue")}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Validation Patterns */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("validationSection.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("validationSection.cardTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("validationSection.cardDescription")}
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">
                        {t("validationSection.strongPasswordLabel")}
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="password"
                          placeholder={t(
                            "validationSection.strongPasswordPlaceholder",
                          )}
                          value="StrongPass123!"
                        />
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-success" />
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-xs">
                          <CheckCircleIcon className="h-3 w-3 text-success mr-1" />
                          <span className="text-success">
                            {t("validationSection.checkMinChars")}
                          </span>
                        </div>
                        <div className="flex items-center text-xs">
                          <CheckCircleIcon className="h-3 w-3 text-success mr-1" />
                          <span className="text-success">
                            {t("validationSection.checkUppercase")}
                          </span>
                        </div>
                        <div className="flex items-center text-xs">
                          <CheckCircleIcon className="h-3 w-3 text-success mr-1" />
                          <span className="text-success">
                            {t("validationSection.checkNumber")}
                          </span>
                        </div>
                        <div className="flex items-center text-xs">
                          <CheckCircleIcon className="h-3 w-3 text-success mr-1" />
                          <span className="text-success">
                            {t("validationSection.checkSpecialChar")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-foreground">
                        {t("validationSection.emailLabel")}
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="email"
                          placeholder={t("validationSection.emailPlaceholder")}
                          value="user@example.com"
                        />
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-success" />
                      </div>
                      <p className="mt-1 text-xs text-success">
                        {t("validationSection.validEmail")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">
                        {t("validationSection.invalidLabel")}
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="text"
                          placeholder={t(
                            "validationSection.invalidPlaceholder",
                          )}
                          value="invalid123"
                          className="border-destructive pr-10"
                        />
                        <XCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
                      </div>
                      <p className="mt-1 text-xs text-destructive">
                        {t("validationSection.invalidMessage")}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-foreground">
                        {t("validationSection.loadingLabel")}
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="text"
                          placeholder={t(
                            "validationSection.loadingPlaceholder",
                          )}
                          value="username123"
                          className="pr-10"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-info">
                        {t("validationSection.loadingMessage")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default FormsAdvancedPage;
