import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  WifiIcon,
  SignalSlashIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import { SEOHead } from "@sudobility/seo_lib";
import { ui, textVariants, variants } from "@sudobility/design";

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
  const { t } = useTranslation("alerts");
  return (
    <div className="relative">
      <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, copyKey)}
        className="absolute top-3 right-3 bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1 rounded text-xs transition-colors"
      >
        {copiedStates[copyKey] ? t("copy.copied") : t("copy.copy")}
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
      <h2 className={textVariants.heading.h2()}>{title}</h2>
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

const AlertsPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const { t } = useTranslation("alerts");
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    "quick-start": true,
    variants: true,
    layouts: true,
    actions: true,
    web3: true,
    interactive: true,
    accessibility: true,
  });
  const [dismissedAlerts, setDismissedAlerts] = useState<{
    [key: string]: boolean;
  }>({});

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

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => ({ ...prev, [alertId]: true }));
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-destructive/10 px-4 py-2 rounded-full mb-6">
              <BellIcon className="h-5 w-5 text-destructive mr-2" />
              <span className="text-destructive font-semibold">
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

            {/* Alert Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-destructive mb-1`}
                >
                  4
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.alertTypes")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-success mb-1`}
                >
                  3
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.layoutOptions")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-info mb-1`}>
                  5
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.actionPatterns")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-warning mb-1`}
                >
                  6
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.web3Examples")}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="quick-start"
              title={t("quickStart.title")}
              description={t("quickStart.description")}
            />

            {expandedSections["quick-start"] && (
              <div className="space-y-8">
                {/* Basic Alert Types */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.essentialTitle")}
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div className={(variants.alert as any).success()}>
                      <CheckCircleIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("quickStart.success.title")}
                        </div>
                        <div className="text-sm">
                          {t("quickStart.success.body")}
                        </div>
                      </div>
                    </div>
                    <div className={(variants.alert as any).info()}>
                      <InformationCircleIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("quickStart.info.title")}
                        </div>
                        <div className="text-sm">
                          {t("quickStart.info.body")}
                        </div>
                      </div>
                    </div>
                    <div className={(variants.alert as any).warning()}>
                      <ExclamationTriangleIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("quickStart.warning.title")}
                        </div>
                        <div className="text-sm">
                          {t("quickStart.warning.body")}
                        </div>
                      </div>
                    </div>
                    <div className={(variants.alert as any).error()}>
                      <XCircleIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("quickStart.error.title")}
                        </div>
                        <div className="text-sm">
                          {t("quickStart.error.body")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="essential-alerts"
                    code={`import { variants } from '@sudobility/design';
import { CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

// Essential alert variants
<div className={(variants.alert as any).success()}>
  <CheckCircleIcon className="h-5 w-5" />
  <div>
    <div className="font-medium">Success!</div>
    <div className="text-sm">Your transaction has been confirmed on the blockchain.</div>
  </div>
</div>

<div className={(variants.alert as any).info()}>
  <InformationCircleIcon className="h-5 w-5" />
  <div>
    <div className="font-medium">Information</div>
    <div className="text-sm">Please connect your wallet to continue with this action.</div>
  </div>
</div>

<div className={(variants.alert as any).warning()}>
  <ExclamationTriangleIcon className="h-5 w-5" />
  <div>
    <div className="font-medium">Warning</div>
    <div className="text-sm">High gas fees detected. Consider waiting for lower network congestion.</div>
  </div>
</div>

<div className={(variants.alert as any).error()}>
  <XCircleIcon className="h-5 w-5" />
  <div>
    <div className="font-medium">Error</div>
    <div className="text-sm">Transaction failed. Please check your wallet balance and try again.</div>
  </div>
</div>`}
                  />
                </div>

                {/* Compact Alerts */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.compactTitle")}
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className={(variants.alert as any).compact.success()}>
                      {t("quickStart.compact.success")}
                    </div>
                    <div className={(variants.alert as any).compact.info()}>
                      {t("quickStart.compact.info")}
                    </div>
                    <div className={(variants.alert as any).compact.warning()}>
                      {t("quickStart.compact.warning")}
                    </div>
                    <div className={(variants.alert as any).compact.error()}>
                      {t("quickStart.compact.error")}
                    </div>
                  </div>
                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="compact-alerts"
                    code={`import { variants } from '@sudobility/design';

// Compact alert variants
<div className={(variants.alert as any).compact.success()}>
  ✓ Email sent successfully
</div>
<div className={(variants.alert as any).compact.info()}>
  ℹ New features available in settings
</div>
<div className={(variants.alert as any).compact.warning()}>
  ⚠ Wallet disconnected
</div>
<div className={(variants.alert as any).compact.error()}>
  ✗ Failed to load messages
</div>`}
                  />
                </div>

                {/* Dismissible Alerts */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.dismissibleTitle")}
                  </h3>
                  <div className="space-y-4 mb-4">
                    {!dismissedAlerts["demo-success"] && (
                      <div className={(variants.alert as any).success()}>
                        <CheckCircleIcon className="h-5 w-5" />
                        <div className="flex-1">
                          <div className="font-medium">
                            {t("quickStart.dismissible.successTitle")}
                          </div>
                          <div className="text-sm">
                            {t("quickStart.dismissible.successBody")}
                          </div>
                        </div>
                        <button
                          onClick={() => dismissAlert("demo-success")}
                          className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 hover:bg-success/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    {!dismissedAlerts["demo-info"] && (
                      <div className={(variants.alert as any).info()}>
                        <InformationCircleIcon className="h-5 w-5" />
                        <div className="flex-1">
                          <div className="font-medium">
                            {t("quickStart.dismissible.infoTitle")}
                          </div>
                          <div className="text-sm">
                            {t("quickStart.dismissible.infoBody")}
                          </div>
                        </div>
                        <button
                          onClick={() => dismissAlert("demo-info")}
                          className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 hover:bg-info/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="dismissible-alerts"
                    code={`import { variants } from '@sudobility/design';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const [dismissed, setDismissed] = useState(false);

// Dismissible alert with close button
{!dismissed && (
  <div className={(variants.alert as any).success()}>
    <CheckCircleIcon className="h-5 w-5" />
    <div className="flex-1">
      <div className="font-medium">Account verified!</div>
      <div className="text-sm">You can now access all premium features.</div>
    </div>
    <button
      onClick={() => setDismissed(true)}
      className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 hover:bg-success/20 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
  </div>
)}`}
                  />
                </div>

                {/* Alert with Actions */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("quickStart.actionsTitle")}
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div className={(variants.alert as any).warning()}>
                      <ExclamationTriangleIcon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">
                          {t("quickStart.actions.title")}
                        </div>
                        <div className="text-sm">
                          {t("quickStart.actions.body")}
                        </div>
                        <div className="mt-3 flex space-x-3">
                          <button className="bg-warning/20 text-warning px-3 py-1 rounded text-sm font-medium hover:bg-warning/30">
                            {t("quickStart.actions.renewNow")}
                          </button>
                          <button className="text-warning px-3 py-1 text-sm font-medium hover:underline">
                            {t("quickStart.actions.remindLater")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="action-alerts"
                    code={`import { variants } from '@sudobility/design';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// Alert with action buttons
<div className={(variants.alert as any).warning()}>
  <ExclamationTriangleIcon className="h-5 w-5" />
  <div className="flex-1">
    <div className="font-medium">Subscription expires soon</div>
    <div className="text-sm">Your premium features will be disabled in 3 days.</div>
    <div className="mt-3 flex space-x-3">
      <button className="bg-warning/20 text-warning px-3 py-1 rounded text-sm font-medium hover:bg-warning/30">
        Renew Now
      </button>
      <button className="text-warning px-3 py-1 text-sm font-medium hover:underline">
        Remind Later
      </button>
    </div>
  </div>
</div>`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Alert Variants Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="variants"
              title={t("variants.title")}
              description={t("variants.description")}
            />

            {expandedSections["variants"] && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Standard Alerts */}
                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>
                      {t("variants.standardTitle")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className={(variants.alert as any).success()}>
                          <CheckCircleIcon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">
                              {t("variants.standard.successTitle")}
                            </div>
                            <div className="text-sm">
                              {t("variants.standard.successBody")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={(variants.alert as any).info()}>
                          <InformationCircleIcon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">
                              {t("variants.standard.infoTitle")}
                            </div>
                            <div className="text-sm">
                              {t("variants.standard.infoBody")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={(variants.alert as any).warning()}>
                          <ExclamationTriangleIcon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">
                              {t("variants.standard.warningTitle")}
                            </div>
                            <div className="text-sm">
                              {t("variants.standard.warningBody")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={(variants.alert as any).error()}>
                          <XCircleIcon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">
                              {t("variants.standard.errorTitle")}
                            </div>
                            <div className="text-sm">
                              {t("variants.standard.errorBody")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compact Alerts */}
                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>
                      {t("variants.compactTitle")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div
                          className={(variants.alert as any).compact.success()}
                        >
                          {t("variants.compact.success")}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("variants.compact.successNote")}
                        </p>
                      </div>
                      <div>
                        <div className={(variants.alert as any).compact.info()}>
                          {t("variants.compact.info")}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("variants.compact.infoNote")}
                        </p>
                      </div>
                      <div>
                        <div
                          className={(variants.alert as any).compact.warning()}
                        >
                          {t("variants.compact.warning")}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("variants.compact.warningNote")}
                        </p>
                      </div>
                      <div>
                        <div
                          className={(variants.alert as any).compact.error()}
                        >
                          {t("variants.compact.error")}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("variants.compact.errorNote")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  copiedStates={copiedStates}
                  copyToClipboard={copyToClipboard}
                  copyKey="all-variants"
                  code={`import { variants } from '@sudobility/design';


// Standard alert variants
<div className={(variants.alert as any).success()}>{/* Success content */}</div>
<div className={(variants.alert as any).info()}>{/* Info content */}</div>
<div className={(variants.alert as any).warning()}>{/* Warning content */}</div>
<div className={(variants.alert as any).error()}>{/* Error content */}</div>

// Compact alert variants
<div className={(variants.alert as any).compact.success()}>Success message</div>
<div className={(variants.alert as any).compact.info()}>Info message</div>
<div className={(variants.alert as any).compact.warning()}>Warning message</div>
<div className={(variants.alert as any).compact.error()}>Error message</div>`}
                />
              </div>
            )}
          </div>

          {/* Web3 Examples Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="web3"
              title={t("web3.title")}
              description={t("web3.description")}
            />

            {expandedSections["web3"] && (
              <div className="space-y-8">
                {/* Transaction Alerts */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("web3.transactionTitle")}
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div className={(variants.alert as any).info()}>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-info"></div>
                      <div>
                        <div className="font-medium">
                          {t("web3.transaction.pendingTitle")}
                        </div>
                        <div className="text-sm">
                          {t("web3.transaction.pendingBody")}
                        </div>
                        <div className="text-xs text-info mt-1">
                          Hash: 0x1234...abcd
                        </div>
                      </div>
                    </div>

                    <div className={(variants.alert as any).success()}>
                      <CheckCircleSolid className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("web3.transaction.confirmedTitle")}
                        </div>
                        <div className="text-sm">
                          {t("web3.transaction.confirmedBody")}
                        </div>
                        <div className="text-xs text-success mt-1">
                          Gas used: 21,000 • Block: #18,234,567
                        </div>
                      </div>
                    </div>

                    <div className={(variants.alert as any).error()}>
                      <XCircleIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("web3.transaction.failedTitle")}
                        </div>
                        <div className="text-sm">
                          {t("web3.transaction.failedBody")}
                        </div>
                        <div className="text-xs text-destructive mt-1">
                          Error: Execution reverted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wallet Alerts */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("web3.walletTitle")}
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div className={(variants.alert as any).warning()}>
                      <WifiIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("web3.wallet.notConnectedTitle")}
                        </div>
                        <div className="text-sm">
                          {t("web3.wallet.notConnectedBody")}
                        </div>
                        <div className="mt-2">
                          <button className="bg-warning/20 text-warning px-3 py-1 rounded text-sm font-medium hover:bg-warning/30">
                            {t("web3.wallet.connectWallet")}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={(variants.alert as any).error()}>
                      <SignalSlashIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("web3.wallet.networkMismatchTitle")}
                        </div>
                        <div className="text-sm">
                          {t("web3.wallet.networkMismatchBody")}
                        </div>
                        <div className="mt-2">
                          <button className="bg-destructive/20 text-destructive px-3 py-1 rounded text-sm font-medium hover:bg-destructive/30">
                            {t("web3.wallet.switchNetwork")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gas Fee Alerts */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("web3.gasTitle")}
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div className={(variants.alert as any).warning()}>
                      <CurrencyDollarIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("web3.gas.highFeesTitle")}
                        </div>
                        <div className="text-sm">
                          {t("web3.gas.highFeesBody")}
                        </div>
                        <div className="text-xs text-warning mt-1">
                          Estimated cost: ~$45 USD • Gas price: 120 gwei
                        </div>
                      </div>
                    </div>

                    <div className={(variants.alert as any).info()}>
                      <UserPlusIcon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">
                          {t("web3.gas.ensTitle")}
                        </div>
                        <div className="text-sm">{t("web3.gas.ensBody")}</div>
                        <div className="mt-2">
                          <button className="bg-info/20 text-info px-3 py-1 rounded text-sm font-medium hover:bg-info/30">
                            {t("web3.gas.setAsPrimary")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  copiedStates={copiedStates}
                  copyToClipboard={copyToClipboard}
                  copyKey="web3-alerts"
                  code={`// Transaction status alerts
<div className={(variants.alert as any).info()}>
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-info"></div>
  <div>
    <div className="font-medium">Transaction Pending</div>
    <div className="text-sm">Your transaction is being processed on the blockchain.</div>
    <div className="text-xs text-info mt-1">Hash: 0x1234...abcd</div>
  </div>
</div>

// Wallet connection alert
<div className={(variants.alert as any).warning()}>
  <WifiIcon className="h-5 w-5" />
  <div>
    <div className="font-medium">Wallet Not Connected</div>
    <div className="text-sm">Please connect your wallet to access your emails.</div>
    <div className="mt-2">
      <button className="bg-warning/20 text-warning px-3 py-1 rounded text-sm font-medium">
        Connect Wallet
      </button>
    </div>
  </div>
</div>

// Gas fee alert
<div className={(variants.alert as any).warning()}>
  <CurrencyDollarIcon className="h-5 w-5" />
  <div>
    <div className="font-medium">High Gas Fees Detected</div>
    <div className="text-sm">Consider waiting for lower network congestion.</div>
    <div className="text-xs text-warning mt-1">Estimated cost: ~$45 USD</div>
  </div>
</div>`}
                />
              </div>
            )}
          </div>

          {/* Accessibility Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="accessibility"
              title={t("accessibility.title")}
              description={t("accessibility.description")}
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
                          <XCircleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("accessibility.ariaTitle")}
                  </h3>
                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="aria-examples"
                    code={`// Alert with proper ARIA attributes
<div 
  className={(variants.alert as any).error()}
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  <XCircleIcon className="h-5 w-5" aria-hidden="true" />
  <div>
    <div className="font-medium">Transaction Failed</div>
    <div className="text-sm">Please check your wallet balance and try again.</div>
  </div>
</div>

// Dismissible alert with accessible button
<div 
  className={(variants.alert as any).info()}
  role="alert"
  aria-live="polite"
>
  <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
  <div className="flex-1">
    <div className="font-medium">New features available</div>
    <div className="text-sm">Check out the updated settings panel.</div>
  </div>
  <button
    type="button"
    className="close-button"
    aria-label="Dismiss alert"
    onClick={handleDismiss}
  >
    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
  </button>
</div>

// Status alert for screen readers
<div
  role="status"
  aria-live="polite"
  className={(variants.alert as any).compact.success()}
>
  Email sent successfully
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
              {t("backToDesign")}
            </LocalizedLink>

            <div className="text-sm text-muted-foreground">
              {t("lastUpdated", { date: new Date().toLocaleDateString() })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertsPage;
