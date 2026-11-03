import {
  ArrowPathIcon,
  BoltIcon,
  CheckIcon,
  CursorArrowRippleIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Card, CardContent } from "@sudobility/components";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const MicroInteractionsAnimationsPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("microInteractions");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [walletStatus, setWalletStatus] = useState<
    "disconnected" | "connecting" | "connected" | "error"
  >("disconnected");

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateWalletConnection = () => {
    setWalletStatus("connecting");
    setTimeout(() => setWalletStatus("connected"), 2000);
    setTimeout(() => setWalletStatus("disconnected"), 4000);
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
              <CursorArrowRippleIcon className="h-5 w-5 text-primary mr-2" />
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
              {t("header.description")}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-warning mb-1`}
                >
                  200+
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.variants")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-primary mb-1`}
                >
                  60fps
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.performance")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-success mb-1`}
                >
                  A11Y
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.motionSafe")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-info mb-1`}>
                  Web3
                </div>
                <div className={textVariants.caption.default()}>
                  {t("stats.specialized")}
                </div>
              </div>
            </div>
          </div>

          {/* Hover Effects Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <CursorArrowRippleIcon
                    className={`${variants.icon.size.lg()} text-primary mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("hover.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("hover.description")}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("hover.buttonEffectsTitle")}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="default"
                        className={variants.animations.hover.button.lift()}
                      >
                        {t("hover.liftEffect")}
                      </Button>
                      <Button
                        variant="secondary"
                        className={variants.animations.hover.button.glow()}
                      >
                        {t("hover.glowEffect")}
                      </Button>
                      <Button
                        variant="default"
                        className={variants.animations.hover.button.scale()}
                      >
                        {t("hover.scaleEffect")}
                      </Button>
                      <Button
                        variant="secondary"
                        className={variants.animations.hover.button.shimmer()}
                      >
                        {t("hover.shimmerEffect")}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("hover.cardEffectsTitle")}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div
                        className={`p-4 border rounded-lg ${variants.animations.hover.card.subtle()}`}
                      >
                        <p className="text-sm">{t("hover.cardSubtle")}</p>
                      </div>
                      <div
                        className={`p-4 border rounded-lg ${variants.animations.hover.card.glow()}`}
                      >
                        <p className="text-sm">{t("hover.cardGlow")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-muted p-4 rounded border">
                  <pre className="text-xs text-foreground overflow-x-auto">
                    {`// Hover Effect Examples
variants.animations.hover.button.lift()
variants.animations.hover.button.glow() 
variants.animations.hover.card.subtle()
variants.animations.hover.icon.bounce()`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <ArrowPathIcon
                    className={`${variants.icon.size.lg()} text-primary mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("loading.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("loading.description")}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("loading.spinnersTitle")}
                    </h4>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-6 h-6 border-2 border-primary border-t-transparent rounded-full ${variants.animations.loading.spinner.default()}`}
                      ></div>
                      <div
                        className={`w-6 h-6 bg-primary rounded-full ${variants.animations.loading.spinner.pulse()}`}
                      ></div>
                      <div
                        className={`w-6 h-6 bg-primary rounded-full ${variants.animations.loading.spinner.bounce()}`}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("loading.interactiveDemoTitle")}
                    </h4>
                    <Button
                      onClick={simulateLoading}
                      disabled={isLoading}
                      className="mb-4"
                    >
                      {isLoading ? (
                        <>
                          <div
                            className={`w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full ${variants.animations.loading.spinner.default()} mr-2`}
                          ></div>
                          {t("loading.loadingLabel")}
                        </>
                      ) : (
                        t("loading.startLoading")
                      )}
                    </Button>

                    <div>
                      <Button onClick={simulateProgress} className="mb-2">
                        {t("loading.simulateProgress")}
                      </Button>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${variants.animations.loading.progress.bar()}`}
                          style={{
                            width: `${progress}%`,
                            background:
                              "linear-gradient(to right, #3b82f6, #8b5cf6)",
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("loading.progress", { progress })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-muted p-4 rounded border">
                  <pre className="text-xs text-foreground overflow-x-auto">
                    {`// Loading Animations
variants.animations.loading.spinner.default()
variants.animations.loading.spinner.pulse()
variants.animations.loading.progress.bar()`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Web3 Animations */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <SparklesIcon
                  className={`${variants.icon.size.lg()} text-primary mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>{t("web3.title")}</h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                {t("web3.description")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("web3.walletStatesTitle")}
                  </h4>
                  <div className="space-y-3">
                    <Button
                      onClick={simulateWalletConnection}
                      className={
                        walletStatus === "connecting"
                          ? variants.animations.web3.wallet.connecting()
                          : walletStatus === "connected"
                            ? variants.animations.web3.wallet.connected()
                            : variants.animations.hover.button.connect()
                      }
                      disabled={walletStatus === "connecting"}
                    >
                      {walletStatus === "connecting" && (
                        <div
                          className={`w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full ${variants.animations.loading.spinner.default()} mr-2`}
                        ></div>
                      )}
                      {walletStatus === "connected" && (
                        <CheckIcon className="w-4 h-4 mr-2" />
                      )}
                      {walletStatus === "connecting"
                        ? t("web3.connecting")
                        : walletStatus === "connected"
                          ? t("web3.connected")
                          : t("web3.connectWallet")}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                      {t("web3.statusLabel")}{" "}
                      <span className="font-medium capitalize">
                        {walletStatus}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("web3.transactionStatesTitle")}
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded-lg ${variants.animations.web3.transaction.pending()}`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 border-2 border-warning border-t-transparent rounded-full ${variants.animations.loading.spinner.default()} mr-2`}
                        ></div>
                        {t("web3.transactionPending")}
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${variants.animations.web3.transaction.confirmed()}`}
                    >
                      <div className="flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2 text-success" />
                        {t("web3.transactionConfirmed")}
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${variants.animations.web3.transaction.failed()}`}
                    >
                      <div className="flex items-center">
                        <XMarkIcon className="w-4 h-4 mr-2 text-destructive" />
                        {t("web3.transactionFailed")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted p-4 rounded border">
                <pre className="text-xs text-foreground overflow-x-auto">
                  {`// Web3 Animation Examples
variants.animations.web3.wallet.connecting()
variants.animations.web3.wallet.connected()
variants.animations.web3.transaction.pending()
variants.animations.web3.transaction.confirmed()`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Motion Preferences */}
          <Card className="mb-8">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("motion.reducedMotionTitle")}
                  </h4>
                  <div className="space-y-3">
                    <Button
                      className={variants.animations.utility.reduced.respectPrefers()}
                    >
                      {t("motion.respectsPreferences")}
                    </Button>
                    <Button
                      className={variants.animations.utility.reduced.fadeOnly()}
                    >
                      {t("motion.fadeOnly")}
                    </Button>
                    <Button
                      className={variants.animations.utility.reduced.scaleOnly()}
                    >
                      {t("motion.scaleOnly")}
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("motion.safeAnimationsTitle")}
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 border rounded-lg ${variants.animations.transitions.fade.default()}`}
                    >
                      <p className="text-sm">{t("motion.safeFade")}</p>
                    </div>
                    <div
                      className={`p-3 border rounded-lg ${variants.animations.transitions.slide.up()}`}
                    >
                      <p className="text-sm">{t("motion.safeSlide")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted p-4 rounded border">
                <pre className="text-xs text-foreground overflow-x-auto">
                  {`// Motion-Safe CSS
variants.animations.utility.reduced.respectPrefers()
// Output: motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none

variants.animations.utility.reduced.fadeOnly()
// Output: transition-opacity duration-300 ease-out`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <CheckIcon
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
                        <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
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
                        <XMarkIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
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

export default MicroInteractionsAnimationsPage;
