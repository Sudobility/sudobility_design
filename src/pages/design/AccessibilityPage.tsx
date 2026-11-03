import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  EyeIcon,
  HandRaisedIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  CursorArrowRaysIcon,
  AdjustmentsHorizontalIcon,
  SpeakerWaveIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Card, CardContent } from "@sudobility/components";
import { ui, textVariants, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const AccessibilityPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("accessibility");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [_highContrast, _setHighContrast] = useState(false);
  const [showSkipLink, setShowSkipLink] = useState(false);

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
            <div className="inline-flex items-center bg-info/10 px-4 py-2 rounded-full mb-6">
              <EyeIcon className="h-5 w-5 text-info mr-2" />
              <span className="text-info font-semibold">
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-primary mb-1`}
                >
                  {t("stats.wcag.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.wcag.label")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-success mb-1`}
                >
                  {t("stats.touch.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.touch.label")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-info mb-1`}>
                  {t("stats.contrast.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.contrast.label")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-warning mb-1`}
                >
                  {t("stats.screenReader.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.screenReader.label")}
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Screen Reader Support */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <SpeakerWaveIcon
                    className={`${variants.icon.size.lg()} text-primary mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("screenReader.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("screenReader.description")}
                </p>

                <div className="space-y-4">
                  {/* Skip Link Demo */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("screenReader.skipLink.title")}
                    </h4>
                    <div className="bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground overflow-x-auto">
                        {`// Screen Reader Skip Link
<a href="#main-content" 
   className={variants.accessibility.screenReader.skipLink()}>
  Skip to main content
</a>

// Output Classes:
sr-only focus:not-sr-only focus:absolute focus:top-0 
focus:left-0 focus:z-50 focus:px-4 focus:py-2 
focus:bg-blue-600 focus:text-white focus:rounded 
focus:m-2 focus:no-underline`}
                      </pre>
                    </div>
                    <button
                      onFocus={() => setShowSkipLink(true)}
                      onBlur={() => setShowSkipLink(false)}
                      className={variants.accessibility.screenReader.skipLink()}
                    >
                      {t("screenReader.skipLink.button")}
                    </button>
                    {showSkipLink && (
                      <p className="text-sm text-success mt-2">
                        {t("screenReader.skipLink.visible")}
                      </p>
                    )}
                  </div>

                  {/* Screen Reader Only Content */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("screenReader.only.title")}
                    </h4>
                    <div className="bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground">
                        {`<span className={variants.accessibility.screenReader.only()}>
  This text is only visible to screen readers
</span>`}
                      </pre>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t("screenReader.only.description")}
                      <span
                        className={variants.accessibility.screenReader.only()}
                      >
                        {t("screenReader.only.hidden")}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Focus Management */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <CursorArrowRaysIcon
                    className={`${variants.icon.size.lg()} text-primary mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("focus.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("focus.description")}
                </p>

                <div className="space-y-4">
                  {/* Focus Ring Examples */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("focus.indicatorsTitle")}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="default"
                        className={variants.accessibility.focus.ring()}
                      >
                        {t("focus.standard")}
                      </Button>
                      <Button
                        variant="secondary"
                        className={variants.accessibility.focus.highContrast()}
                      >
                        {t("focus.highContrast")}
                      </Button>
                      <Button
                        variant="default"
                        className={variants.accessibility.focus.wallet()}
                      >
                        {t("focus.wallet")}
                      </Button>
                      <Button
                        variant="destructive"
                        className={variants.accessibility.focus.error()}
                      >
                        {t("focus.error")}
                      </Button>
                    </div>
                    <div className="mt-4 bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground">
                        {`// Focus Ring Variants
variants.accessibility.focus.ring()        // Standard
variants.accessibility.focus.highContrast() // High contrast
variants.accessibility.focus.wallet()      // Web3 specific
variants.accessibility.focus.error()       // Error states`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Contrast */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <AdjustmentsHorizontalIcon
                    className={`${variants.icon.size.lg()} text-success mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("contrast.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("contrast.description")}
                </p>

                <div className="space-y-4">
                  {/* Contrast Examples */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("contrast.levelsTitle")}
                    </h4>
                    <div className="space-y-3">
                      <div
                        className={`p-3 rounded ${variants.accessibility.contrast.text.high()}`}
                      >
                        {t("contrast.high")}
                      </div>
                      <div
                        className={`p-3 rounded ${variants.accessibility.contrast.text.medium()}`}
                      >
                        {t("contrast.medium")}
                      </div>
                      <div
                        className={`p-3 rounded ${variants.accessibility.contrast.text.low()}`}
                      >
                        {t("contrast.low")}
                      </div>
                    </div>

                    <h4 className={`${textVariants.heading.h5()} mb-3 mt-6`}>
                      {t("contrast.backgroundsTitle")}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.primary()}`}
                      >
                        {t("contrast.primary")}
                      </div>
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.success()}`}
                      >
                        {t("contrast.success")}
                      </div>
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.warning()}`}
                      >
                        {t("contrast.warning")}
                      </div>
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.error()}`}
                      >
                        {t("contrast.errorLabel")}
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground">
                      {`// Contrast Utilities
variants.accessibility.contrast.text.high()
variants.accessibility.contrast.background.primary()
variants.accessibility.contrast.link.default()`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Motion Preferences */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <BoltIcon
                    className={`${variants.icon.size.lg()} text-warning mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("motion.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("motion.description")}
                </p>

                <div className="space-y-4">
                  {/* Motion Controls */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("motion.controlsTitle")}
                    </h4>
                    <div className="flex items-center space-x-4 mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={reducedMotion}
                          onChange={(e) => setReducedMotion(e.target.checked)}
                          className="mr-2"
                        />
                        {t("motion.reduceMotion")}
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        className={
                          reducedMotion
                            ? variants.accessibility.motion.reduceMotion()
                            : variants.animations.hover.button.lift()
                        }
                      >
                        {reducedMotion
                          ? t("motion.noAnimation")
                          : t("motion.animatedButton")}
                      </Button>
                      <div
                        className={`w-8 h-8 bg-primary rounded mx-auto ${
                          reducedMotion
                            ? variants.accessibility.motion.loading.spin()
                            : "animate-spin"
                        }`}
                      ></div>
                    </div>

                    <div className="mt-4 bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground">
                        {`// Motion-Safe Animations
variants.accessibility.motion.respectPrefers()
variants.accessibility.motion.safe.fade()
variants.accessibility.motion.loading.spin()

// CSS Output:
motion-safe:transition-all motion-safe:duration-300 
motion-reduce:transition-none`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Accessibility */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <HandRaisedIcon
                  className={`${variants.icon.size.lg()} text-primary mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>{t("form.title")}</h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                {t("form.description")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("form.requiredTitle")}
                  </h4>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="email-field"
                        className={`block text-sm font-medium mb-1 ${variants.accessibility.form.required.visual()}`}
                      >
                        {t("form.emailLabel")}
                      </label>
                      <input
                        id="email-field"
                        type="email"
                        className={`w-full px-3 py-2 border border-input rounded-md focus:outline-none ${variants.accessibility.focus.ring()}`}
                        aria-required="true"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password-field"
                        className={`block text-sm font-medium mb-1 ${variants.accessibility.form.required.visual()}`}
                      >
                        {t("form.passwordLabel")}
                      </label>
                      <input
                        id="password-field"
                        type="password"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${variants.accessibility.form.validation.invalid()}`}
                        aria-invalid="true"
                        aria-describedby="password-error"
                      />
                      <div
                        id="password-error"
                        className={`mt-1 ${variants.accessibility.feedback.error.message()}`}
                        role="alert"
                        aria-live="polite"
                      >
                        {t("form.passwordError")}
                      </div>
                    </div>
                  </form>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("form.codeExamplesTitle")}
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground overflow-x-auto">
                      {`// Required Field Visual Indicator
variants.accessibility.form.required.visual()
// Output: after:content-["*"] after:ml-1 after:text-red-500

// Form Validation States
variants.accessibility.form.validation.valid()
variants.accessibility.form.validation.invalid()
variants.accessibility.form.validation.pending()

// Error Message
variants.accessibility.feedback.error.container()
variants.accessibility.feedback.error.message()`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Messages */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftRightIcon
                  className={`${variants.icon.size.lg()} text-warning mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  {t("feedback.title")}
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                {t("feedback.description")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("feedback.messageTypesTitle")}
                  </h4>
                  <div className="space-y-4">
                    <div
                      className={variants.accessibility.feedback.success.container()}
                    >
                      <div className="flex">
                        <CheckCircleIcon
                          className={`h-5 w-5 ${variants.accessibility.feedback.success.title()} mr-2 flex-shrink-0`}
                        />
                        <div>
                          <h5
                            className={variants.accessibility.feedback.success.title()}
                          >
                            {t("feedback.successTitle")}
                          </h5>
                          <p
                            className={variants.accessibility.feedback.success.message()}
                          >
                            {t("feedback.successMessage")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={variants.accessibility.feedback.error.container()}
                    >
                      <div className="flex">
                        <XCircleIcon
                          className={`h-5 w-5 ${variants.accessibility.feedback.error.title()} mr-2 flex-shrink-0`}
                        />
                        <div>
                          <h5
                            className={variants.accessibility.feedback.error.title()}
                          >
                            {t("feedback.errorTitle")}
                          </h5>
                          <p
                            className={variants.accessibility.feedback.error.message()}
                          >
                            {t("feedback.errorMessage")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("feedback.liveRegionTitle")}
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground">
                      {`// Live Regions for Dynamic Content
<div className={variants.accessibility.feedback.liveRegion.polite()}>
  Status updates appear here
</div>

<div className={variants.accessibility.feedback.liveRegion.assertive()}>
  Urgent alerts appear here  
</div>

<div className={variants.accessibility.feedback.liveRegion.status()}>
  Loading states and progress
</div>`}
                    </pre>
                  </div>

                  {/* Live region examples */}
                  <div
                    className={variants.accessibility.feedback.liveRegion.polite()}
                  >
                    {t("feedback.politeExample")}
                  </div>
                  <div
                    className={variants.accessibility.feedback.liveRegion.assertive()}
                  >
                    {t("feedback.assertiveExample")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Web3 Accessibility */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <GlobeAltIcon
                  className={`${variants.icon.size.lg()} text-info mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>{t("web3.title")}</h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                {t("web3.description")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("web3.componentsTitle")}
                  </h4>
                  <div className="space-y-4">
                    <Button
                      className={variants.accessibility.focus.wallet()}
                      aria-label={t("web3.connectWalletAria")}
                    >
                      {t("web3.connectWallet")}
                    </Button>

                    <div
                      className={variants.accessibility.semantic.web3.transaction()}
                      aria-label={t("web3.transactionAria")}
                    >
                      {t("web3.transactionPending")}
                    </div>

                    <div
                      className={variants.accessibility.semantic.web3.balance()}
                      aria-label={t("web3.balanceAria")}
                    >
                      1.5 ETH
                    </div>

                    <code
                      className={`text-sm font-mono ${variants.accessibility.semantic.web3.address()}`}
                      aria-label={t("web3.addressAria")}
                    >
                      0x1234...5678
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("web3.implementationTitle")}
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground">
                      {`// Web3 Semantic Patterns
<button className={variants.accessibility.semantic.web3.wallet()}>
  Connect Wallet
</button>

<div className={variants.accessibility.semantic.web3.transaction()}>
  Transaction Status
</div>

<span className={variants.accessibility.semantic.web3.balance()}>
  Account Balance  
</span>

<code className={variants.accessibility.semantic.web3.address()}>
  Wallet Address
</code>`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <CheckCircleIcon
                  className={`${variants.icon.size.lg()} text-success mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  {t("bestPractices.title")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>
                    {t("bestPractices.doTitle")}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {(
                      t("bestPractices.do", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>
                    {t("bestPractices.avoidTitle")}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {(
                      t("bestPractices.avoid", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccessibilityPage;
