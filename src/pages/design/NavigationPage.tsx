import { textVariants, ui, variants } from "@sudobility/design";
import { cn } from "@sudobility/components";
import {
  ArchiveBoxIcon,
  Bars3Icon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  InboxIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@sudobility/seo_lib";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Section,
} from "@sudobility/components";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const NavigationPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("navigation");
  const [activeStep, setActiveStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(3);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickStartExamples = [
    {
      title: t("quickStart.examples.breadcrumb.title"),
      description: t("quickStart.examples.breadcrumb.description"),
      code: `// Basic Breadcrumb
<nav className={variants.navigation.breadcrumb.container()}>
  <ol className={variants.navigation.breadcrumb.list()}>
    <li className={variants.navigation.breadcrumb.item()}>
      <a href="/" className={variants.navigation.breadcrumb.link()}>
        <HomeIcon className={variants.navigation.breadcrumb.home()} />
        Home
      </a>
    </li>
    <ChevronRightIcon className={variants.navigation.breadcrumb.separator()} />
    <li className={variants.navigation.breadcrumb.item()}>
      <span className={variants.navigation.breadcrumb.current()}>
        Current Page
      </span>
    </li>
  </ol>
</nav>`,
    },
    {
      title: t("quickStart.examples.tabs.title"),
      description: t("quickStart.examples.tabs.description"),
      code: `// Tab Navigation
<Tabs defaultValue="overview" className="w-full">
  <TabsList className={variants.navigation.tabs.list()}>
    <TabsTrigger value="overview" className={variants.navigation.tabs.trigger()}>
      Overview
    </TabsTrigger>
    <TabsTrigger value="settings" className={variants.navigation.tabs.trigger()}>
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className={variants.navigation.tabs.content()}>
    Overview content
  </TabsContent>
</Tabs>`,
    },
    {
      title: t("quickStart.examples.pagination.title"),
      description: t("quickStart.examples.pagination.description"),
      code: `// Pagination Component
<div className={variants.navigation.pagination.container()}>
  <div className={variants.navigation.pagination.nav()}>
    <p className={variants.navigation.pagination.results()}>
      Showing 1 to 10 of 97 results
    </p>
    <div className={variants.navigation.pagination.buttons()}>
      <button className={cn(
        variants.navigation.pagination.button(),
        variants.navigation.pagination.buttonFirst()
      )}>
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <button className={variants.navigation.pagination.buttonActive()}>
        3
      </button>
      <button className={cn(
        variants.navigation.pagination.button(),
        variants.navigation.pagination.buttonLast()
      )}>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
</div>`,
    },
    {
      title: t("quickStart.examples.steps.title"),
      description: t("quickStart.examples.steps.description"),
      code: `// Step Navigation
<div className={variants.navigation.steps.container()}>
  <ol className={variants.navigation.steps.list()}>
    <li className={variants.navigation.steps.step()}>
      <div className={variants.navigation.steps.circleCompleted()}>
        <CheckIcon className="h-4 w-4" />
      </div>
      <span className={variants.navigation.steps.label()}>
        Complete
      </span>
    </li>
    <div className={variants.navigation.steps.connectorActive()} />
    <li className={variants.navigation.steps.step()}>
      <div className={variants.navigation.steps.circleActive()}>
        2
      </div>
      <span className={variants.navigation.steps.label()}>
        In Progress
      </span>
    </li>
  </ol>
</div>`,
    },
  ];

  const sidebarItems = [
    {
      name: t("sidebar.items.dashboard"),
      icon: HomeIcon,
      href: "/dashboard",
      active: true,
    },
    {
      name: t("sidebar.items.inbox"),
      icon: InboxIcon,
      href: "/inbox",
      active: false,
      count: 12,
    },
    {
      name: t("sidebar.items.sent"),
      icon: PaperAirplaneIcon,
      href: "/sent",
      active: false,
    },
    {
      name: t("sidebar.items.archive"),
      icon: ArchiveBoxIcon,
      href: "/archive",
      active: false,
    },
    {
      name: t("sidebar.items.settings"),
      icon: Cog6ToothIcon,
      href: "/settings",
      active: false,
    },
  ];

  const steps = [
    {
      id: 1,
      name: t("steps.items.accountSetup.name"),
      description: t("steps.items.accountSetup.description"),
      status: "complete",
    },
    {
      id: 2,
      name: t("steps.items.walletConnection.name"),
      description: t("steps.items.walletConnection.description"),
      status: "current",
    },
    {
      id: 3,
      name: t("steps.items.emailSetup.name"),
      description: t("steps.items.emailSetup.description"),
      status: "upcoming",
    },
    {
      id: 4,
      name: t("steps.items.complete.name"),
      description: t("steps.items.complete.description"),
      status: "upcoming",
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
              <Bars3Icon className="h-5 w-5 text-primary mr-2" />
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
              {t("header.intro")}
            </p>
          </div>

          {/* Quick Start Examples */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("quickStart.title")}
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
                      title={t("quickStart.copy")}
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

          {/* Interactive Breadcrumb Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("breadcrumbs.sectionTitle")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
            >
              <div className="mb-6">
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("breadcrumbs.liveTitle")}
                </h3>

                {/* Demo breadcrumb */}
                <nav className={variants.navigation.breadcrumb.container()}>
                  <ol className={variants.navigation.breadcrumb.list()}>
                    <li className={variants.navigation.breadcrumb.item()}>
                      <button className={variants.navigation.breadcrumb.link()}>
                        <HomeIcon
                          className={variants.navigation.breadcrumb.home()}
                        />
                        {t("breadcrumbs.home")}
                      </button>
                    </li>
                    <ChevronRightIcon
                      className={variants.navigation.breadcrumb.separator()}
                    />
                    <li className={variants.navigation.breadcrumb.item()}>
                      <button className={variants.navigation.breadcrumb.link()}>
                        {t("breadcrumbs.web3Projects")}
                      </button>
                    </li>
                    <ChevronRightIcon
                      className={variants.navigation.breadcrumb.separator()}
                    />
                    <li className={variants.navigation.breadcrumb.item()}>
                      <span
                        className={variants.navigation.breadcrumb.current()}
                      >
                        {emailDomain}
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className={`${textVariants.heading.h5()} mb-2`}>
                  {t("breadcrumbs.featuresTitle")}
                </h4>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  {(
                    t("breadcrumbs.features", {
                      returnObjects: true,
                    }) as string[]
                  ).map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Tab Variants */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("tabVariants.sectionTitle")}
            </h2>

            <div className="space-y-8">
              {/* Default Tabs */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("tabVariants.defaultTitle")}
                </h3>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className={variants.navigation.tabs.list()}>
                    <TabsTrigger
                      value="overview"
                      className={variants.navigation.tabs.trigger()}
                    >
                      {t("tabVariants.overview")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className={variants.navigation.tabs.trigger()}
                    >
                      {t("tabVariants.analytics")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className={variants.navigation.tabs.trigger()}
                    >
                      {t("tabVariants.settings")}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="overview"
                    className={variants.navigation.tabs.content()}
                  >
                    <div className="p-4 bg-muted rounded-lg">
                      <p className={textVariants.body.md()}>
                        {t("tabVariants.overviewContent")}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="analytics"
                    className={variants.navigation.tabs.content()}
                  >
                    <div className="p-4 bg-muted rounded-lg">
                      <p className={textVariants.body.md()}>
                        {t("tabVariants.analyticsContent")}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="settings"
                    className={variants.navigation.tabs.content()}
                  >
                    <div className="p-4 bg-muted rounded-lg">
                      <p className={textVariants.body.md()}>
                        {t("tabVariants.settingsContent")}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Underlined Tabs */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("tabVariants.underlinedTitle")}
                </h3>
                <div className="w-full">
                  <div className={variants.navigation.tabs.listUnderlined()}>
                    <button
                      className={cn(
                        variants.navigation.tabs.triggerUnderlined(),
                        "data-[state=active]",
                      )}
                    >
                      {t("tabVariants.dashboard")}
                    </button>
                    <button
                      className={variants.navigation.tabs.triggerUnderlined()}
                    >
                      {t("tabVariants.team")}
                    </button>
                    <button
                      className={variants.navigation.tabs.triggerUnderlined()}
                    >
                      {t("tabVariants.projects")}
                    </button>
                    <button
                      className={variants.navigation.tabs.triggerUnderlined()}
                    >
                      {t("tabVariants.calendar")}
                    </button>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className={textVariants.body.md()}>
                      {t("tabVariants.underlinedContent")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pills Tabs */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("tabVariants.pillsTitle")}
                </h3>
                <div className="w-full">
                  <div className={variants.navigation.tabs.listPills()}>
                    <button
                      className={cn(
                        variants.navigation.tabs.triggerPills(),
                        "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                      )}
                    >
                      {t("tabVariants.all")}
                    </button>
                    <button className={variants.navigation.tabs.triggerPills()}>
                      {t("tabVariants.active")}
                    </button>
                    <button className={variants.navigation.tabs.triggerPills()}>
                      {t("tabVariants.draft")}
                    </button>
                    <button className={variants.navigation.tabs.triggerPills()}>
                      {t("tabVariants.archived")}
                    </button>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className={textVariants.body.md()}>
                      {t("tabVariants.pillsContent")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Pagination Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("pagination.sectionTitle")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("pagination.listTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("pagination.listDescription")}
                </p>
              </div>

              <div className="p-6">
                {/* Mock email list */}
                <div className="space-y-3 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center p-3 border border-border rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary text-sm font-medium">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div
                          className={`${textVariants.body.md()} font-medium`}
                        >
                          {t("pagination.emailSubject", {
                            number: currentPage * 5 - 5 + i + 1,
                          })}
                        </div>
                        <div
                          className={`${textVariants.body.sm()} text-muted-foreground`}
                        >
                          sender{currentPage * 5 - 5 + i + 1}@example.com
                        </div>
                      </div>
                      <div
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        {t("pagination.timeAgo")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className={variants.navigation.pagination.container()}>
                  <div className={variants.navigation.pagination.info()}>
                    <button
                      className={variants.navigation.pagination.mobileButton()}
                    >
                      {t("pagination.previous")}
                    </button>
                    <button
                      className={variants.navigation.pagination.mobileButton()}
                    >
                      {t("pagination.next")}
                    </button>
                  </div>
                  <div className={variants.navigation.pagination.nav()}>
                    <div>
                      <p className={variants.navigation.pagination.results()}>
                        {t("pagination.showing")}{" "}
                        <span className="font-medium">
                          {(currentPage - 1) * 5 + 1}
                        </span>{" "}
                        {t("pagination.to")}{" "}
                        <span className="font-medium">{currentPage * 5}</span>{" "}
                        {t("pagination.of")}{" "}
                        <span className="font-medium">97</span>{" "}
                        {t("pagination.results")}
                      </p>
                    </div>
                    <div>
                      <nav className={variants.navigation.pagination.buttons()}>
                        <button
                          className={cn(
                            variants.navigation.pagination.button(),
                            variants.navigation.pagination.buttonFirst(),
                          )}
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                        >
                          <ChevronLeftIcon className="h-4 w-4" />
                        </button>

                        {[1, 2, 3, 4, 5].map((page) => (
                          <button
                            key={page}
                            className={
                              page === currentPage
                                ? variants.navigation.pagination.buttonActive()
                                : variants.navigation.pagination.button()
                            }
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          className={cn(
                            variants.navigation.pagination.button(),
                            variants.navigation.pagination.buttonLast(),
                          )}
                          onClick={() =>
                            setCurrentPage(Math.min(5, currentPage + 1))
                          }
                        >
                          <ChevronRightIcon className="h-4 w-4" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Step Navigation */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("steps.sectionTitle")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
            >
              <div className="mb-8">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("steps.demoTitle")}
                </h3>
                <p
                  className={`${textVariants.body.md()} text-muted-foreground`}
                >
                  {t("steps.demoDescription")}
                </p>
              </div>

              <div className={variants.navigation.steps.container()}>
                <ol className={variants.navigation.steps.list()}>
                  {steps.map((step, stepIdx) => (
                    <React.Fragment key={step.id}>
                      {stepIdx > 0 && (
                        <div
                          className={
                            step.status === "complete" ||
                            stepIdx <
                              steps.findIndex((s) => s.status === "current")
                              ? variants.navigation.steps.connectorActive()
                              : variants.navigation.steps.connector()
                          }
                        />
                      )}
                      <li className={variants.navigation.steps.step()}>
                        <button
                          onClick={() => setActiveStep(step.id)}
                          className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-ring rounded-md p-2"
                        >
                          <div
                            className={
                              step.status === "complete"
                                ? variants.navigation.steps.circleCompleted()
                                : step.status === "current"
                                  ? variants.navigation.steps.circleActive()
                                  : variants.navigation.steps.circle()
                            }
                          >
                            {step.status === "complete" ? (
                              <CheckIcon className="h-4 w-4" />
                            ) : step.status === "current" ? (
                              <ClockIcon className="h-4 w-4" />
                            ) : (
                              <span>{step.id}</span>
                            )}
                          </div>
                          <div className="text-left">
                            <div
                              className={
                                step.status === "current" ||
                                step.status === "complete"
                                  ? variants.navigation.steps.label()
                                  : variants.navigation.steps.labelInactive()
                              }
                            >
                              {step.name}
                            </div>
                            <div
                              className={`${textVariants.body.sm()} text-muted-foreground`}
                            >
                              {step.description}
                            </div>
                          </div>
                        </button>
                      </li>
                    </React.Fragment>
                  ))}
                </ol>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h4 className={`${textVariants.heading.h4()} mb-3`}>
                  {t("steps.stepLabel", { number: activeStep })}{" "}
                  {steps.find((s) => s.id === activeStep)?.name}
                </h4>
                <p className={textVariants.body.md()}>
                  {activeStep === 1 && t("steps.details.1", { emailDomain })}
                  {activeStep === 2 && t("steps.details.2")}
                  {activeStep === 3 && t("steps.details.3")}
                  {activeStep === 4 && t("steps.details.4")}
                </p>
              </div>
            </div>
          </Section>

          {/* Sidebar Navigation Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("sidebar.sectionTitle")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("sidebar.cardTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("sidebar.cardDescription")}
                </p>
              </div>

              <div className="flex h-96">
                {/* Sidebar */}
                <div className="w-64 border-r border-border">
                  <div className={variants.navigation.sidebar.container()}>
                    <nav className={variants.navigation.sidebar.nav()}>
                      {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className={
                              item.active
                                ? variants.navigation.sidebar.itemActive()
                                : variants.navigation.sidebar.item()
                            }
                            onClick={(e) => e.preventDefault()}
                          >
                            <Icon
                              className={
                                item.active
                                  ? variants.navigation.sidebar.iconActive()
                                  : variants.navigation.sidebar.icon()
                              }
                            />
                            {item.name}
                            {item.count && (
                              <span className="ml-auto bg-primary/10 text-primary py-0.5 px-2 text-xs font-medium rounded-full">
                                {item.count}
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                  <div className="h-full bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <InboxIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p
                        className={`${textVariants.body.lg()} text-muted-foreground`}
                      >
                        {t("sidebar.mainContent")}
                      </p>
                      <p
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        {t("sidebar.mainContentHint")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Web3 Navigation Patterns */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("web3Patterns.sectionTitle")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h3()} mb-2`}>
                    {t("web3Patterns.walletStatus.title")}
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    {t("web3Patterns.walletStatus.description")}
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
                        <span
                          className={`${textVariants.body.sm()} text-success`}
                        >
                          {t("web3Patterns.walletStatus.connected")}
                        </span>
                      </div>
                      <span
                        className={`${textVariants.body.xs()} font-mono text-success`}
                      >
                        0x742d...4e88
                      </span>
                    </div>
                    <nav className="space-y-1">
                      <a
                        href="#"
                        className="flex items-center px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-md"
                      >
                        <InboxIcon className="mr-3 h-4 w-4" />
                        {t("web3Patterns.walletStatus.inbox")}
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                      >
                        <UserIcon className="mr-3 h-4 w-4" />
                        {t("web3Patterns.walletStatus.ensProfile")}
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                      >
                        <Cog6ToothIcon className="mr-3 h-4 w-4" />
                        {t("web3Patterns.walletStatus.walletSettings")}
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h3()} mb-2`}>
                    {t("web3Patterns.multiChain.title")}
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    {t("web3Patterns.multiChain.description")}
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Chain selector */}
                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                        <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
                        {t("web3Patterns.multiChain.ethereum")}
                      </button>
                      <button className="flex items-center px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg text-sm font-medium transition-colors">
                        <div className="w-4 h-4 bg-secondary rounded-full mr-2"></div>
                        {t("web3Patterns.multiChain.solana")}
                      </button>
                      <button className="flex items-center px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg text-sm font-medium transition-colors">
                        <div className="w-4 h-4 bg-accent rounded-full mr-2"></div>
                        {t("web3Patterns.multiChain.polygon")}
                      </button>
                    </div>

                    {/* Chain-specific navigation */}
                    <div className="border-t border-border pt-4">
                      <nav className="space-y-1">
                        <a
                          href="#"
                          className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                        >
                          <InboxIcon className="mr-3 h-4 w-4" />
                          {t("web3Patterns.multiChain.ethereumInbox")}
                          <span className="ml-auto bg-primary/10 text-primary py-0.5 px-2 text-xs font-medium rounded-full">
                            3
                          </span>
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                        >
                          <DocumentTextIcon className="mr-3 h-4 w-4" />
                          {t("web3Patterns.multiChain.ensNames")}
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                        >
                          <Cog6ToothIcon className="mr-3 h-4 w-4" />
                          {t("web3Patterns.multiChain.gasSettings")}
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Accessibility Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("accessibility.sectionTitle")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("accessibility.title")}
                </h3>
                <p
                  className={`${textVariants.body.md()} text-muted-foreground`}
                >
                  {t("accessibility.description")}
                </p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("accessibility.ariaLandmarks")}
                  </h4>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-foreground">{`<nav role="navigation" aria-label="Main navigation">
  <ol role="list" aria-label="Breadcrumb">
    <li><a href="/" aria-current="page">Home</a></li>
  </ol>
</nav>

<nav role="tablist" aria-label="Content sections">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
</nav>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("accessibility.keyboardNavigation")}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className={`${textVariants.body.sm()} font-medium`}>
                        {t("accessibility.breadcrumbsLabel")}
                      </div>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        {(
                          t("accessibility.breadcrumbsKeys", {
                            returnObjects: true,
                          }) as string[]
                        ).map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className={`${textVariants.body.sm()} font-medium`}>
                        {t("accessibility.tabsLabel")}
                      </div>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        {(
                          t("accessibility.tabsKeys", {
                            returnObjects: true,
                          }) as string[]
                        ).map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Implementation Notes */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("implementation.sectionTitle")}
            </h2>

            <div className={`${ui.background.subtle} rounded-xl p-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("implementation.performanceTitle")}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {(
                      t("implementation.performance", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("implementation.mobileTitle")}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {(
                      t("implementation.mobile", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default NavigationPage;
