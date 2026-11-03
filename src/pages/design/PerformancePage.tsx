import { textVariants, ui, variants } from "@sudobility/design";
import {
  ArrowPathIcon,
  BoltIcon,
  ChartBarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Card, CardContent } from "@sudobility/components";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const PerformancePage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("performance");
  const [connectionSpeed, setConnectionSpeed] = useState<
    "fast" | "slow" | "offline"
  >("fast");
  const [webVitalsScore, setWebVitalsScore] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
  });
  const [networkLatency, setNetworkLatency] = useState(0);

  // Simulate performance metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setWebVitalsScore({
        lcp: Math.random() * 4000, // Largest Contentful Paint in ms
        fid: Math.random() * 300, // First Input Delay in ms
        cls: Math.random() * 0.25, // Cumulative Layout Shift
      });
      setNetworkLatency(Math.random() * 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVitalsRating = (metric: string, value: number) => {
    switch (metric) {
      case "lcp":
        if (value <= 2500) return "good";
        if (value <= 4000) return "needsImprovement";
        return "poor";
      case "fid":
        if (value <= 100) return "good";
        if (value <= 300) return "needsImprovement";
        return "poor";
      case "cls":
        if (value <= 0.1) return "good";
        if (value <= 0.25) return "needsImprovement";
        return "poor";
      default:
        return "good";
    }
  };

  const simulateSlowConnection = () => {
    setConnectionSpeed("slow");
    setTimeout(() => setConnectionSpeed("fast"), 5000);
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
            <div className="inline-flex items-center bg-success/10 px-4 py-2 rounded-full mb-6">
              <RocketLaunchIcon className="h-5 w-5 text-success mr-2" />
              <span className="text-success font-semibold">
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

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-success mb-1`}
                >
                  {t("header.stats.bundleSplit.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("header.stats.bundleSplit.label")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-primary mb-1`}
                >
                  {t("header.stats.gpuLayers.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("header.stats.gpuLayers.label")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-warning mb-1`}
                >
                  {t("header.stats.web3Batch.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("header.stats.web3Batch.label")}
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-info mb-1`}>
                  {t("header.stats.lcpTarget.value")}
                </div>
                <div className={textVariants.caption.default()}>
                  {t("header.stats.lcpTarget.label")}
                </div>
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <ChartBarIcon
                    className={`${variants.icon.size.lg()} text-primary mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("webVitals.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("webVitals.description")}
                </p>

                <div className="space-y-4">
                  {/* LCP */}
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className={`${textVariants.heading.h5()}`}>
                        {t("webVitals.lcp.title")}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t("webVitals.lcp.description")}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded ${variants.performance.monitoring.metrics[
                        getVitalsRating("lcp", webVitalsScore.lcp)
                      ]()}`}
                    >
                      {Math.round(webVitalsScore.lcp)}ms
                    </div>
                  </div>

                  {/* FID */}
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className={`${textVariants.heading.h5()}`}>
                        {t("webVitals.fid.title")}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t("webVitals.fid.description")}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded ${variants.performance.monitoring.metrics[
                        getVitalsRating("fid", webVitalsScore.fid)
                      ]()}`}
                    >
                      {Math.round(webVitalsScore.fid)}ms
                    </div>
                  </div>

                  {/* CLS */}
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className={`${textVariants.heading.h5()}`}>
                        {t("webVitals.cls.title")}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t("webVitals.cls.description")}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded ${variants.performance.monitoring.metrics[
                        getVitalsRating("cls", webVitalsScore.cls)
                      ]()}`}
                    >
                      {webVitalsScore.cls.toFixed(3)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-muted p-4 rounded border">
                  <pre className="text-xs text-foreground overflow-x-auto">
                    {`// Core Web Vitals Optimization
variants.performance.webVitals.lcp.optimize()
variants.performance.webVitals.interactivity.optimize()
variants.performance.webVitals.layoutStability.stable()`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <BoltIcon
                    className={`${variants.icon.size.lg()} text-warning mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    {t("bundle.title")}
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  {t("bundle.description")}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("bundle.lazyLoadingStates")}
                    </h4>
                    <div className="space-y-2">
                      <div
                        className={`p-3 rounded ${variants.performance.bundle.lazy.component()}`}
                      >
                        <p className="text-sm">
                          {t("bundle.componentLoading")}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded ${variants.performance.bundle.lazy.componentLoaded()}`}
                      >
                        <p className="text-sm">{t("bundle.componentLoaded")}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("bundle.codeSplittingExample")}
                    </h4>
                    <div
                      className={`p-3 rounded border ${variants.performance.bundle.splitting.fallback()}`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin mr-2`}
                        ></div>
                        {t("bundle.loadingChunk")}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      {t("bundle.bundleAnalysis")}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-success/10 rounded">
                        <span className="font-medium">
                          {t("bundle.mainBundle")}
                        </span>{" "}
                        245KB
                      </div>
                      <div className="p-2 bg-primary/10 rounded">
                        <span className="font-medium">
                          {t("bundle.designSystem")}
                        </span>{" "}
                        128KB
                      </div>
                      <div className="p-2 bg-primary/10 rounded">
                        <span className="font-medium">
                          {t("bundle.web3Utils")}
                        </span>{" "}
                        89KB
                      </div>
                      <div className="p-2 bg-warning/10 rounded">
                        <span className="font-medium">
                          {t("bundle.charts")}
                        </span>{" "}
                        56KB
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Optimization */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <GlobeAltIcon
                  className={`${variants.icon.size.lg()} text-primary mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  {t("network.title")}
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                {t("network.description")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("network.connectionQuality")}
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded ${variants.performance.network.connection[
                        connectionSpeed
                      ]()}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{t("network.currentConnection")}</span>
                        <span className="font-medium capitalize">
                          {connectionSpeed}
                        </span>
                      </div>
                      <div className="text-sm opacity-75 mt-1">
                        {t("network.latency", {
                          latency: Math.round(networkLatency),
                        })}
                      </div>
                    </div>

                    <Button onClick={simulateSlowConnection} variant="outline">
                      {t("network.simulateSlowConnection")}
                    </Button>
                  </div>

                  <h4 className={`${textVariants.heading.h5()} mb-3 mt-6`}>
                    {t("network.cacheStatus")}
                  </h4>
                  <div className="space-y-2">
                    <div
                      className={variants.performance.network.cache.cached()}
                    >
                      <div className="p-3">
                        <span
                          className={variants.performance.network.cache.fresh()}
                        >
                          {t("network.freshData")}
                        </span>
                        {t("network.freshDataSuffix")}
                      </div>
                    </div>
                    <div
                      className={variants.performance.network.cache.updating()}
                    >
                      <div className="p-3">
                        <span
                          className={variants.performance.network.cache.stale()}
                        >
                          {t("network.staleData")}
                        </span>
                        {t("network.staleDataSuffix")}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("network.implementation")}
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground overflow-x-auto">
                      {`// Network Quality Detection
variants.performance.network.connection.fast()
variants.performance.network.connection.slow()  
variants.performance.network.connection.offline()

// Cache Status Indicators
variants.performance.network.cache.cached()
variants.performance.network.cache.fresh()
variants.performance.network.cache.stale()`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Web3 Performance */}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("web3.walletConnection")}
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded border ${variants.performance.web3.wallet.cached()}`}
                    >
                      <div className="flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2 text-success" />
                        {t("web3.cachedConnection")}
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded border ${variants.performance.web3.wallet.connecting()}`}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("web3.connecting")}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("web3.transactionBatching")}
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={variants.performance.web3.transaction.batched()}
                    >
                      <div className="p-3">
                        <div className="flex items-center">
                          <BoltIcon className="w-4 h-4 mr-2" />
                          {t("web3.batchedTransactions")}
                        </div>
                        <div className="text-sm opacity-75 mt-1">
                          {t("web3.batchedTransactionsDetail")}
                        </div>
                      </div>
                    </div>
                    <div
                      className={variants.performance.web3.transaction.individual()}
                    >
                      <div className="p-3">
                        <div className="flex items-center">
                          <ArrowPathIcon className="w-4 h-4 mr-2" />
                          {t("web3.individualTransaction")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    {t("web3.gasOptimization")}
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`text-center p-2 rounded ${variants.performance.web3.transaction.gasOptimal()}`}
                    >
                      {t("web3.gasOptimal")}
                    </div>
                    <div
                      className={`text-center p-2 rounded ${variants.performance.web3.transaction.gasHigh()}`}
                    >
                      {t("web3.gasHigh")}
                    </div>
                    <div
                      className={`text-center p-2 rounded ${variants.performance.web3.transaction.gasVeryHigh()}`}
                    >
                      {t("web3.gasVeryHigh")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted p-4 rounded border">
                <pre className="text-xs text-foreground overflow-x-auto">
                  {`// Web3 Performance Optimizations
variants.performance.web3.wallet.cached()
variants.performance.web3.transaction.batched()
variants.performance.web3.blockchain.optimistic()

// Gas Price Optimization
variants.performance.web3.transaction.gasOptimal()
variants.performance.web3.transaction.gasHigh()`}
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
                        <ExclamationTriangleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
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

export default PerformancePage;
