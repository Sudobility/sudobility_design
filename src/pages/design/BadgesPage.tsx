import {
  ArrowLeftIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";
import CodeBlock from "../../components/CodeBlock";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Extracted component to avoid creating components during render
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

const BadgesPage: React.FC<AppProps> = ({ appName }) => {
  const { t } = useTranslation("badges");
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    "quick-start": true,
    variants: true,
    sizes: true,
    states: true,
    web3: true,
    interactive: true,
    accessibility: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <SEOHead
        title={t("seo.title", { appName })}
        description={t("seo.description")}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
            <SparklesIcon className="h-5 w-5 text-primary mr-2" />
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

          {/* Badge Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-warning mb-1`}>
                8
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.badgeVariants")}
              </div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-success mb-1`}>
                3
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.sizeOptions")}
              </div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-primary mb-1`}>
                5
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.stateTypes")}
              </div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-info mb-1`}>
                4
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.web3Variants")}
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
              {/* Basic Badges */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("sections.quickStart.essentialTitle")}
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.default()}>
                      {t("sections.quickStart.essential.default")}
                    </span>
                    <span className={variants.badge.primary()}>
                      {t("sections.quickStart.essential.primary")}
                    </span>
                    <span className={variants.badge.success()}>
                      {t("sections.quickStart.essential.success")}
                    </span>
                    <span className={variants.badge.warning()}>
                      {t("sections.quickStart.essential.warning")}
                    </span>
                    <span className={variants.badge.error()}>
                      {t("sections.quickStart.essential.error")}
                    </span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/essential-variants.tsx"
                  title={t("codeTitles.essentialVariants")}
                />
              </div>

              {/* Status Badges with Icons */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("sections.quickStart.statusTitle")}
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.success()}>
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      {t("sections.quickStart.status.active")}
                    </span>
                    <span className={variants.badge.warning()}>
                      <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                      {t("sections.quickStart.status.pending")}
                    </span>
                    <span className={variants.badge.error()}>
                      <XCircleIcon className="h-3 w-3 mr-1" />
                      {t("sections.quickStart.status.failed")}
                    </span>
                    <span className={variants.badge.primary()}>
                      <InformationCircleIcon className="h-3 w-3 mr-1" />
                      {t("sections.quickStart.status.info")}
                    </span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/status-icons.tsx"
                  title={t("codeTitles.statusIcons")}
                />
              </div>

              {/* Size Variants */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("sections.quickStart.sizesTitle")}
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.small("primary")}>
                      {t("sections.quickStart.sizes.small")}
                    </span>
                    <span className={variants.badge.primary()}>
                      {t("sections.quickStart.sizes.default")}
                    </span>
                    <span className={variants.badge.large("primary")}>
                      {t("sections.quickStart.sizes.large")}
                    </span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/sizes.tsx"
                  title={t("codeTitles.sizes")}
                />
              </div>

              {/* Web3 Badges */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("sections.quickStart.web3Title")}
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.ethereum()}>
                      <svg
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0L5.35 12.11L12 16.22L18.65 12.11L12 0Z" />
                        <path d="M12 17.75L5.35 13.64L12 24L18.65 13.64L12 17.75Z" />
                      </svg>
                      {t("sections.quickStart.web3.ethereum")}
                    </span>
                    <span className={variants.badge.solana()}>
                      <BoltIcon className="h-3 w-3 mr-1" />
                      {t("sections.quickStart.web3.solana")}
                    </span>
                    <span className={variants.badge.primary()}>
                      <ShieldCheckIcon className="h-3 w-3 mr-1" />
                      {t("sections.quickStart.web3.verified")}
                    </span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/web3-variants.tsx"
                  title={t("codeTitles.web3Variants")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Badge Variants Section */}
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
                {/* Semantic Variants */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("sections.variants.semanticTitle")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.default()}>
                          {t("sections.variants.semantic.default")}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("sections.variants.semantic.defaultDesc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.primary()}>
                          {t("sections.variants.semantic.primary")}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("sections.variants.semantic.primaryDesc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.success()}>
                          {t("sections.variants.semantic.success")}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("sections.variants.semantic.successDesc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.warning()}>
                          {t("sections.variants.semantic.warning")}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("sections.variants.semantic.warningDesc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.error()}>
                          {t("sections.variants.semantic.error")}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("sections.variants.semantic.errorDesc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Web3 Variants */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    {t("sections.variants.web3Title")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.ethereum()}>
                          {t("sections.variants.web3.ethereum")}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("sections.variants.web3.ethereumDesc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.solana()}>
                          {t("sections.variants.web3.solana")}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("sections.variants.web3.solanaDesc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock
                filename="internal/badges/complete-system.tsx"
                title={t("codeTitles.completeSystem")}
              />
            </div>
          )}
        </div>

        {/* Size Variants Section */}
        <div className={`${variants.card.elevated.padded()} mb-12`}>
          <SectionHeader
            id="sizes"
            title={t("sections.sizes.title")}
            description={t("sections.sizes.description")}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {expandedSections["sizes"] && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("sections.sizes.small.heading")}
                  </h4>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <span className={variants.badge.small("primary")}>
                      {t("sections.sizes.small.badge")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("sections.sizes.small.desc")}
                  </p>
                </div>

                <div className="text-center">
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("sections.sizes.default.heading")}
                  </h4>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <span className={variants.badge.primary()}>
                      {t("sections.sizes.default.badge")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("sections.sizes.default.desc")}
                  </p>
                </div>

                <div className="text-center">
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("sections.sizes.large.heading")}
                  </h4>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <span className={variants.badge.large("primary")}>
                      {t("sections.sizes.large.badge")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("sections.sizes.large.desc")}
                  </p>
                </div>
              </div>

              <CodeBlock
                filename="internal/badges/size-variants.tsx"
                title={t("codeTitles.sizeVariants")}
              />
            </div>
          )}
        </div>

        {/* Interactive Examples Section */}
        <div className={`${variants.card.elevated.padded()} mb-12`}>
          <SectionHeader
            id="interactive"
            title={t("sections.interactive.title")}
            description={t("sections.interactive.description")}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {expandedSections["interactive"] && (
            <div className="space-y-8">
              {/* User Status Example */}
              <div>
                <h3 className={`${textVariants.heading.h4()} mb-4`}>
                  {t("sections.interactive.userStatusTitle")}
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-card rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-full mr-3"></div>
                        <span>user.eth</span>
                      </div>
                      <span className={variants.badge.success()}>
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        {t("sections.interactive.userStatus.online")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-secondary rounded-full mr-3"></div>
                        <span>wallet.sol</span>
                      </div>
                      <span className={variants.badge.warning()}>
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {t("sections.interactive.userStatus.away")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-muted-foreground rounded-full mr-3"></div>
                        <span>address.crypto</span>
                      </div>
                      <span className={variants.badge.default()}>
                        {t("sections.interactive.userStatus.offline")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Badges */}
              <div>
                <h3 className={`${textVariants.heading.h4()} mb-4`}>
                  {t("sections.interactive.notificationTitle")}
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-6">
                    <div className="relative">
                      <button className="p-3 bg-card rounded-lg border">
                        {t("sections.interactive.notification.messages")}
                      </button>
                      <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        5
                      </span>
                    </div>
                    <div className="relative">
                      <button className="p-3 bg-card rounded-lg border">
                        {t("sections.interactive.notification.notifications")}
                      </button>
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        12
                      </span>
                    </div>
                    <div className="relative">
                      <button className="p-3 bg-card rounded-lg border">
                        {t("sections.interactive.notification.updates")}
                      </button>
                      <span className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock
                filename="internal/badges/interactive-patterns.tsx"
                title={t("codeTitles.interactivePatterns")}
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
                    {t("sections.accessibility.bestPracticesTitle")}
                  </h3>
                  <ul className="space-y-3">
                    {(
                      t("sections.accessibility.bestPractices", {
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
                    {t("sections.accessibility.avoidTitle")}
                  </h3>
                  <ul className="space-y-3">
                    {(
                      t("sections.accessibility.avoid", {
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
                  {t("sections.accessibility.ariaExamplesTitle")}
                </h3>
                <CodeBlock
                  filename="internal/badges/accessible-examples.tsx"
                  title={t("codeTitles.accessibleExamples")}
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
            {t("backToDesignSystem")}
          </LocalizedLink>

          <div className="text-sm text-muted-foreground">
            {t("lastUpdated", { date: new Date().toLocaleDateString() })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgesPage;
