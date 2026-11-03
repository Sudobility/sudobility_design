import { textVariants, ui, variants } from "@sudobility/design";
import {
  CheckCircleIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@sudobility/seo_lib";
import {
  Button,
  Spinner,
  Section,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sudobility/components";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const ModalsPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const { t } = useTranslation("modals");
  const [_activeModal, setActiveModal] = useState<string | null>(null);
  const [transactionState, setTransactionState] = useState<
    "idle" | "pending" | "confirming" | "success" | "error"
  >("idle");

  // Demo state for interactive examples
  const [demoState, setDemoState] = useState({
    simpleModal: false,
    confirmationModal: false,
    walletModal: false,
    transactionModal: false,
    formModal: false,
    settingsModal: false,
  });

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
    setDemoState((prev) => ({ ...prev, [modalType]: true }));
  };

  const closeModal = (modalType: string) => {
    setActiveModal(null);
    setDemoState((prev) => ({ ...prev, [modalType]: false }));
  };

  const handleTransaction = () => {
    setTransactionState("pending");
    setTimeout(() => setTransactionState("confirming"), 2000);
    setTimeout(() => setTransactionState("success"), 5000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickStartExamples = [
    {
      title: t("quickStart.examples.basic.title"),
      description: t("quickStart.examples.basic.description"),
      code: `// Basic Modal Structure
<div className={variants.modal.overlay.default()}>
  <div className={variants.modal.container.medium()}>
    <div className={variants.modal.header.default()}>
      <h3 className={textVariants.heading.h3()}>Modal Title</h3>
      <button className={variants.modal.close.default()}>
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
    <div className={variants.modal.content.default()}>
      <p>Modal content goes here...</p>
    </div>
    <div className={variants.modal.footer.default()}>
      <Button variant="outline">Cancel</Button>
      <Button variant="default">Confirm</Button>
    </div>
  </div>
</div>`,
    },
    {
      title: t("quickStart.examples.confirmation.title"),
      description: t("quickStart.examples.confirmation.description"),
      code: `// Confirmation Dialog
<div className={variants.modal.overlay.default()}>
  <div className={variants.modal.container.small()}>
    <div className={variants.modal.content.padded()}>
      <div className="flex items-center gap-3 mb-4">
        <ExclamationTriangleIcon className="h-6 w-6 text-warning" />
        <h3 className={textVariants.heading.h4()}>Confirm Action</h3>
      </div>
      <p className={textVariants.body.md()}>Are you sure you want to delete this item?</p>
    </div>
    <div className={variants.modal.footer.default()}>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  </div>
</div>`,
    },
    {
      title: t("quickStart.examples.wallet.title"),
      description: t("quickStart.examples.wallet.description"),
      code: `// Web3 Wallet Modal
<div className={variants.modal.overlay.default()}>
  <div className={variants.modal.web3.wallet()}>
    <div className={variants.modal.header.default()}>
      <h3 className={textVariants.heading.h3()}>Connect Wallet</h3>
      <button className={variants.modal.close.default()}>
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
    <div className={variants.modal.content.default()}>
      <div className="space-y-3">
        <button className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-muted">
          <WalletIcon className="h-6 w-6" />
          <span>MetaMask</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-muted">
          <WalletIcon className="h-6 w-6" />
          <span>WalletConnect</span>
        </button>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      title: t("quickStart.examples.transaction.title"),
      description: t("quickStart.examples.transaction.description"),
      code: `// Transaction Status Modal
<div className={variants.modal.overlay.default()}>
  <div className={variants.modal.web3.transaction()}>
    <div className={variants.modal.content.padded()}>
      <div className="text-center">
        <div className="mb-4">
          {transactionState === 'pending' && <Spinner size="large" />}
          {transactionState === 'success' && <CheckCircleIcon className="h-12 w-12 text-success mx-auto" />}
        </div>
        <h3 className={textVariants.heading.h3()}>
          {transactionState === 'pending' ? 'Transaction Pending' : 'Transaction Successful'}
        </h3>
        <p className={textVariants.body.md()}>
          {transactionState === 'pending' ? 'Please confirm in your wallet...' : 'Your transaction has been completed.'}
        </p>
      </div>
    </div>
  </div>
</div>`,
    },
  ];

  const sizeVariants = [
    { name: t("sizes.names.small"), value: "small", maxWidth: "max-w-sm" },
    { name: t("sizes.names.medium"), value: "medium", maxWidth: "max-w-md" },
    { name: t("sizes.names.large"), value: "large", maxWidth: "max-w-2xl" },
    {
      name: t("sizes.names.extraLarge"),
      value: "extraLarge",
      maxWidth: "max-w-4xl",
    },
  ];

  const _overlayVariants = [
    { name: "Default", value: "default", description: "Standard dark overlay" },
    { name: "Dark", value: "dark", description: "Darker overlay for emphasis" },
    {
      name: "Light",
      value: "light",
      description: "Lighter overlay for subtle modals",
    },
  ];

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
          <div className="mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Cog6ToothIcon className="h-5 w-5 text-primary mr-2" />
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
                    <pre className="p-4 text-sm overflow-x-auto bg-muted">
                      <code className="text-foreground">{example.code}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(example.code)}
                      className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground bg-card rounded-md shadow-sm border border-border hover:bg-muted transition-colors"
                      title={t("common.copyToClipboard")}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Interactive Demos */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("demos.heading")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                onClick={() => openModal("simpleModal")}
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`${textVariants.heading.h4()} group-hover:text-primary transition-colors`}
                  >
                    {t("demos.cards.simpleModal.title")}
                  </h3>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Cog6ToothIcon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("demos.cards.simpleModal.description")}
                </p>
              </button>

              <button
                onClick={() => openModal("confirmationModal")}
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`${textVariants.heading.h4()} group-hover:text-warning transition-colors`}
                  >
                    {t("demos.cards.confirmationModal.title")}
                  </h3>
                  <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                    <ExclamationTriangleIcon className="h-4 w-4 text-warning" />
                  </div>
                </div>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("demos.cards.confirmationModal.description")}
                </p>
              </button>

              <button
                onClick={() => openModal("walletModal")}
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`${textVariants.heading.h4()} group-hover:text-success transition-colors`}
                  >
                    {t("demos.cards.walletModal.title")}
                  </h3>
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <WalletIcon className="h-4 w-4 text-success" />
                  </div>
                </div>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("demos.cards.walletModal.description")}
                </p>
              </button>

              <button
                onClick={() => {
                  openModal("transactionModal");
                  setTransactionState("idle");
                }}
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`${textVariants.heading.h4()} group-hover:text-info transition-colors`}
                  >
                    {t("demos.cards.transactionModal.title")}
                  </h3>
                  <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center">
                    <CurrencyDollarIcon className="h-4 w-4 text-info" />
                  </div>
                </div>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("demos.cards.transactionModal.description")}
                </p>
              </button>

              <button
                onClick={() => openModal("formModal")}
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`${textVariants.heading.h4()} group-hover:text-destructive transition-colors`}
                  >
                    {t("demos.cards.formModal.title")}
                  </h3>
                  <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                    <Cog6ToothIcon className="h-4 w-4 text-destructive" />
                  </div>
                </div>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("demos.cards.formModal.description")}
                </p>
              </button>

              <button
                onClick={() => openModal("settingsModal")}
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`${textVariants.heading.h4()} group-hover:text-muted-foreground transition-colors`}
                  >
                    {t("demos.cards.settingsModal.title")}
                  </h3>
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Cog6ToothIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("demos.cards.settingsModal.description")}
                </p>
              </button>
            </div>
          </Section>

          {/* Size Variants */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("sizes.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("sizes.availableTitle")}
                </h3>
                <p
                  className={`${textVariants.body.md()} text-muted-foreground`}
                >
                  {t("sizes.availableDescription")}
                </p>
              </div>

              <div className="divide-y divide-border">
                {sizeVariants.map((variant, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className={`${textVariants.heading.h4()} mb-1`}>
                          {variant.name}
                        </h4>
                        <code
                          className={`${textVariants.body.sm()} text-muted-foreground bg-muted px-2 py-1 rounded`}
                        >
                          variants.modal.container.{variant.value}()
                        </code>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `variants.modal.container.${variant.value}()`,
                          )
                        }
                        className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors"
                        title={t("common.copyToClipboard")}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`bg-muted p-4 rounded-lg ${variant.maxWidth} mx-auto border-2 border-dashed border-border`}
                    >
                      <div className="bg-card p-3 rounded border">
                        <div className="text-center text-muted-foreground text-sm">
                          {t("sizes.boxLabel", {
                            name: variant.name,
                            maxWidth: variant.maxWidth,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Web3 Integration Examples */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("web3.heading")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h3()} mb-2`}>
                    {t("web3.walletFlow.title")}
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    {t("web3.walletFlow.description")}
                  </p>
                </div>
                <div className="p-6">
                  <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                    <code className="text-foreground">{`// Wallet Connection Modal
<div className={variants.modal.overlay.default()}>
  <div className={variants.modal.web3.wallet()}>
    <div className={variants.modal.header.default()}>
      <h3>Connect Your Wallet</h3>
      <CloseButton />
    </div>
    <div className={variants.modal.content.default()}>
      <WalletProviderList />
    </div>
  </div>
</div>`}</code>
                  </pre>
                </div>
              </div>

              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h3()} mb-2`}>
                    {t("web3.transactionConfirmation.title")}
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    {t("web3.transactionConfirmation.description")}
                  </p>
                </div>
                <div className="p-6">
                  <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-lg">
                    <code className="text-foreground">{`// Transaction Modal
<div className={variants.modal.overlay.default()}>
  <div className={variants.modal.web3.transaction()}>
    <div className={variants.modal.content.padded()}>
      <TransactionDetails />
      <GasFeeEstimate />
    </div>
    <div className={variants.modal.footer.default()}>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm Transaction</Button>
    </div>
  </div>
</div>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Section>

          {/* Accessibility Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("accessibility.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("accessibility.ariaTitle")}
                </h3>
                <p
                  className={`${textVariants.body.md()} text-muted-foreground`}
                >
                  {t("accessibility.ariaDescription")}
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className={`${textVariants.heading.h4()} mb-3`}>
                      {t("accessibility.requiredAria")}
                    </h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code className="text-foreground">{`<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  className={variants.modal.overlay.default()}
>
  <div className={variants.modal.container.medium()}>
    <h2 id="modal-title">Modal Title</h2>
    <p id="modal-description">Modal description text</p>
  </div>
</div>`}</code>
                    </pre>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h4()} mb-3`}>
                      {t("accessibility.focusManagement")}
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {(
                        t("accessibility.focusItems", {
                          returnObjects: true,
                        }) as string[]
                      ).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h4()} mb-3`}>
                      {t("accessibility.screenReader")}
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {(
                        t("accessibility.screenReaderItems", {
                          returnObjects: true,
                        }) as string[]
                      ).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <InformationCircleIcon className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Implementation Notes */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("implementation.heading")}
            </h2>

            <div className={`${ui.background.subtle} rounded-xl p-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("implementation.portalTitle")}
                  </h3>
                  <p
                    className={`${textVariants.body.md()} text-muted-foreground mb-4`}
                  >
                    {t("implementation.portalDescription")}
                  </p>
                  <pre className="bg-muted text-foreground p-4 rounded-lg text-sm">
                    <code>{`import { createPortal } from 'react-dom';


const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;
  
  return createPortal(
    <div className={variants.modal.overlay.default()}>
      {children}
    </div>,
    document.body
  );
};`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("implementation.animationTitle")}
                  </h3>
                  <p
                    className={`${textVariants.body.md()} text-muted-foreground mb-4`}
                  >
                    {t("implementation.animationDescription")}
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    {(
                      t("implementation.animationItems", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Demo Modals */}
      {demoState.simpleModal && (
        <div
          className={variants.modal.overlay.default()}
          onClick={() => closeModal("simpleModal")}
        >
          <div
            className={variants.modal.container.medium()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={variants.modal.header.default()}>
              <h3 className={textVariants.heading.h3()}>
                {t("simpleModal.title")}
              </h3>
              <button
                className={variants.modal.close.default()}
                onClick={() => closeModal("simpleModal")}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className={variants.modal.content.default()}>
              <p className={textVariants.body.md()}>{t("simpleModal.body")}</p>
              <p
                className={`${textVariants.body.sm()} text-muted-foreground mt-3`}
              >
                {t("simpleModal.hint")}
              </p>
            </div>
            <div className={variants.modal.footer.default()}>
              <Button
                variant="outline"
                onClick={() => closeModal("simpleModal")}
              >
                {t("common.cancel")}
              </Button>
              <Button onClick={() => closeModal("simpleModal")}>
                {t("simpleModal.gotIt")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {demoState.confirmationModal && (
        <div
          className={variants.modal.overlay.default()}
          onClick={() => closeModal("confirmationModal")}
        >
          <div
            className={variants.modal.container.small()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={variants.modal.content.padded()}>
              <div className="flex items-center gap-3 mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-warning" />
                <h3 className={textVariants.heading.h4()}>
                  {t("confirmationModal.title")}
                </h3>
              </div>
              <p className={textVariants.body.md()}>
                {t("confirmationModal.body")}
              </p>
            </div>
            <div className={variants.modal.footer.default()}>
              <Button
                variant="outline"
                onClick={() => closeModal("confirmationModal")}
              >
                {t("common.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={() => closeModal("confirmationModal")}
              >
                {t("confirmationModal.delete")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {demoState.walletModal && (
        <div
          className={variants.modal.overlay.default()}
          onClick={() => closeModal("walletModal")}
        >
          <div
            className={variants.modal.web3.wallet()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={variants.modal.header.default()}>
              <h3 className={textVariants.heading.h3()}>
                {t("walletModal.title")}
              </h3>
              <button
                className={variants.modal.close.default()}
                onClick={() => closeModal("walletModal")}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className={variants.modal.content.default()}>
              <p
                className={`${textVariants.body.sm()} text-muted-foreground mb-4`}
              >
                {t("walletModal.choose", { emailDomain })}
              </p>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center">
                    <WalletIcon className="h-5 w-5 text-info" />
                  </div>
                  <div className="text-left">
                    <div className={textVariants.heading.h5()}>
                      {t("walletModal.metamask")}
                    </div>
                    <div
                      className={`${textVariants.caption.default()} text-muted-foreground`}
                    >
                      {t("walletModal.metamaskDescription")}
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <WalletIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className={textVariants.heading.h5()}>
                      {t("walletModal.walletConnect")}
                    </div>
                    <div
                      className={`${textVariants.caption.default()} text-muted-foreground`}
                    >
                      {t("walletModal.walletConnectDescription")}
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                    <WalletIcon className="h-5 w-5 text-warning" />
                  </div>
                  <div className="text-left">
                    <div className={textVariants.heading.h5()}>
                      {t("walletModal.phantom")}
                    </div>
                    <div
                      className={`${textVariants.caption.default()} text-muted-foreground`}
                    >
                      {t("walletModal.phantomDescription")}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {demoState.transactionModal && (
        <div className={variants.modal.overlay.default()}>
          <div className={variants.modal.web3.transaction()}>
            <div className={variants.modal.content.padded()}>
              <div className="text-center">
                <div className="mb-6">
                  {transactionState === "idle" && (
                    <CurrencyDollarIcon className="h-12 w-12 text-primary mx-auto" />
                  )}
                  {transactionState === "pending" && (
                    <Spinner size="large" className="mx-auto" />
                  )}
                  {transactionState === "confirming" && (
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )}
                  {transactionState === "success" && (
                    <CheckCircleIcon className="h-12 w-12 text-success mx-auto" />
                  )}
                  {transactionState === "error" && (
                    <ExclamationTriangleIcon className="h-12 w-12 text-destructive mx-auto" />
                  )}
                </div>
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t(`transactionModal.title.${transactionState}`)}
                </h3>
                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t(`transactionModal.description.${transactionState}`)}
                </p>

                {transactionState === "idle" && (
                  <div className="space-y-4 mb-6">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={textVariants.body.sm()}>
                          {t("transactionModal.amount")}
                        </span>
                        <span
                          className={`${textVariants.body.sm()} font-medium`}
                        >
                          0.5 ETH
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className={textVariants.body.sm()}>
                          {t("transactionModal.gasFee")}
                        </span>
                        <span
                          className={`${textVariants.body.sm()} font-medium`}
                        >
                          ~$12.50
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2 mt-2">
                        <span className={textVariants.body.sm()}>
                          {t("transactionModal.total")}
                        </span>
                        <span
                          className={`${textVariants.body.md()} font-semibold`}
                        >
                          ~0.5045 ETH
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  {transactionState === "idle" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => closeModal("transactionModal")}
                      >
                        {t("common.cancel")}
                      </Button>
                      <Button onClick={handleTransaction}>
                        {t("transactionModal.confirm")}
                      </Button>
                    </>
                  )}
                  {(transactionState === "success" ||
                    transactionState === "error") && (
                    <Button onClick={() => closeModal("transactionModal")}>
                      {t("transactionModal.close")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {demoState.formModal && (
        <div
          className={variants.modal.overlay.default()}
          onClick={() => closeModal("formModal")}
        >
          <div
            className={variants.modal.container.large()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={variants.modal.header.default()}>
              <h3 className={textVariants.heading.h3()}>
                {t("formModal.title")}
              </h3>
              <button
                className={variants.modal.close.default()}
                onClick={() => closeModal("formModal")}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className={variants.modal.content.default()}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`${textVariants.body.sm()} block mb-2`}>
                      {t("formModal.firstName")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder={t("formModal.firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className={`${textVariants.body.sm()} block mb-2`}>
                      {t("formModal.lastName")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder={t("formModal.lastNamePlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label className={`${textVariants.body.sm()} block mb-2`}>
                    {t("formModal.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={t("formModal.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label className={`${textVariants.body.sm()} block mb-2`}>
                    {t("formModal.message")}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={t("formModal.messagePlaceholder")}
                  />
                </div>
              </form>
            </div>
            <div className={variants.modal.footer.default()}>
              <Button variant="outline" onClick={() => closeModal("formModal")}>
                {t("common.cancel")}
              </Button>
              <Button onClick={() => closeModal("formModal")}>
                {t("formModal.send")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {demoState.settingsModal && (
        <div
          className={variants.modal.overlay.default()}
          onClick={() => closeModal("settingsModal")}
        >
          <div
            className={variants.modal.container.extraLarge()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={variants.modal.header.default()}>
              <h3 className={textVariants.heading.h3()}>
                {t("settingsModal.title")}
              </h3>
              <button
                className={variants.modal.close.default()}
                onClick={() => closeModal("settingsModal")}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className={variants.modal.content.scrollable()}>
              <div className="space-y-8">
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("settingsModal.account")}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={textVariants.body.md()}>
                          {t("settingsModal.emailNotifications")}
                        </div>
                        <div
                          className={`${textVariants.body.sm()} text-muted-foreground`}
                        >
                          {t("settingsModal.emailNotificationsDescription")}
                        </div>
                      </div>
                      <button className="w-11 h-6 bg-primary rounded-full relative transition-colors">
                        <div className="w-4 h-4 bg-primary-foreground rounded-full absolute top-1 right-1 transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={textVariants.body.md()}>
                          {t("settingsModal.twoFactor")}
                        </div>
                        <div
                          className={`${textVariants.body.sm()} text-muted-foreground`}
                        >
                          {t("settingsModal.twoFactorDescription")}
                        </div>
                      </div>
                      <button className="w-11 h-6 bg-input rounded-full relative transition-colors">
                        <div className="w-4 h-4 bg-background rounded-full absolute top-1 left-1 transition-transform"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("settingsModal.privacy")}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className={`${textVariants.body.sm()} block mb-2`}>
                        {t("settingsModal.profileVisibility")}
                      </label>
                      <Select defaultValue="public">
                        <SelectTrigger className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            {t("settingsModal.visibilityPublic")}
                          </SelectItem>
                          <SelectItem value="friends">
                            {t("settingsModal.visibilityFriends")}
                          </SelectItem>
                          <SelectItem value="private">
                            {t("settingsModal.visibilityPrivate")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className={`${textVariants.body.sm()} block mb-2`}>
                        {t("settingsModal.dataSharing")}
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            defaultChecked
                          />
                          <span className={textVariants.body.sm()}>
                            {t("settingsModal.analyticsConsent")}
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className={textVariants.body.sm()}>
                            {t("settingsModal.thirdPartyConsent")}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("settingsModal.appearance")}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className={`${textVariants.body.sm()} block mb-2`}>
                        {t("settingsModal.theme")}
                      </label>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                          {t("settingsModal.themeLight")}
                        </button>
                        <button className="px-4 py-2 border border-border rounded-md text-sm">
                          {t("settingsModal.themeDark")}
                        </button>
                        <button className="px-4 py-2 border border-border rounded-md text-sm">
                          {t("settingsModal.themeAuto")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={variants.modal.footer.spaceBetween()}>
              <Button
                variant="outline"
                onClick={() => closeModal("settingsModal")}
              >
                {t("settingsModal.resetDefaults")}
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => closeModal("settingsModal")}
                >
                  {t("common.cancel")}
                </Button>
                <Button onClick={() => closeModal("settingsModal")}>
                  {t("settingsModal.saveChanges")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalsPage;
