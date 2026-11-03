import React from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../components/LocalizedLink";
import {
  SwatchIcon,
  DocumentTextIcon as TextIcon,
  PaintBrushIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
  RectangleStackIcon,
  SparklesIcon,
  BellIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  WindowIcon,
  Bars3Icon,
  TableCellsIcon,
  ClipboardDocumentListIcon,
  SpeakerWaveIcon,
  Squares2X2Icon,
  TableCellsIcon as TableIcon,
  PhotoIcon,
  Square3Stack3DIcon,
  CursorArrowRippleIcon,
  EyeIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { SEOHead } from "@sudobility/seo_lib";
import { ui, textVariants, designTokens } from "@sudobility/design";
import ThemeSwitcher from "../components/internal/ThemeSwitcher";
import ThemeModeSwitcher from "../components/internal/ThemeModeSwitcher";
import ThemePreview from "../components/internal/ThemePreview";
import { useDesignTheme } from "../context/DesignThemeContext";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const DesignSystemPage: React.FC<AppProps> = ({ appName }) => {
  const { t } = useTranslation("home");
  const { themeName } = useDesignTheme();

  // Presentational config per area; user-facing text is loaded from the
  // `home` namespace via the area key (see public/locales/en/home.json).
  const designAreas = [
    {
      key: "colors",
      icon: SwatchIcon,
      path: "/design/colors",
      gradient: "from-destructive to-accent",
    },
    {
      key: "typography",
      icon: TextIcon,
      path: "/design/text",
      gradient: "from-primary to-info",
    },
    {
      key: "forms",
      icon: CubeTransparentIcon,
      path: "/design/forms",
      gradient: "from-success to-info",
    },
    {
      key: "buttons",
      icon: CursorArrowRaysIcon,
      path: "/design/buttons",
      gradient: "from-secondary to-accent",
    },
    {
      key: "cards",
      icon: RectangleStackIcon,
      path: "/design/cards",
      gradient: "from-warning to-destructive",
    },
    {
      key: "badges",
      icon: SparklesIcon,
      path: "/design/badges",
      gradient: "from-warning to-accent",
    },
    {
      key: "alerts",
      icon: BellIcon,
      path: "/design/alerts",
      gradient: "from-destructive to-accent",
    },
    {
      key: "inputs",
      icon: PencilSquareIcon,
      path: "/design/inputs",
      gradient: "from-info to-primary",
    },
    {
      key: "loading",
      icon: ArrowPathIcon,
      path: "/design/loading",
      gradient: "from-info to-success",
    },
    {
      key: "modals",
      icon: WindowIcon,
      path: "/design/modals",
      gradient: "from-secondary to-primary",
    },
    {
      key: "navigation",
      icon: Bars3Icon,
      path: "/design/navigation",
      gradient: "from-muted to-muted-foreground",
    },
    {
      key: "dataDisplay",
      icon: TableCellsIcon,
      path: "/design/data-display",
      gradient: "from-success to-info",
    },
    {
      key: "formsAdvanced",
      icon: ClipboardDocumentListIcon,
      path: "/design/forms-advanced",
      gradient: "from-secondary to-primary",
    },
    {
      key: "notificationsFeedback",
      icon: SpeakerWaveIcon,
      path: "/design/notifications-feedback",
      gradient: "from-primary to-info",
    },
    {
      key: "layoutSpacing",
      icon: Squares2X2Icon,
      path: "/design/layout-spacing",
      gradient: "from-success to-primary",
    },
    {
      key: "tablesGrids",
      icon: TableIcon,
      path: "/design/tables-grids",
      gradient: "from-primary to-secondary",
    },
    {
      key: "iconsIllustrations",
      icon: PhotoIcon,
      path: "/design/icons-illustrations",
      gradient: "from-accent to-destructive",
    },
    {
      key: "overlaysPortals",
      icon: Square3Stack3DIcon,
      path: "/design/overlays-portals",
      gradient: "from-primary to-secondary",
    },
    {
      key: "microInteractions",
      icon: CursorArrowRippleIcon,
      path: "/design/micro-interactions-animations",
      gradient: "from-accent to-secondary",
    },
    {
      key: "accessibility",
      icon: EyeIcon,
      path: "/design/accessibility",
      gradient: "from-success to-primary",
    },
    {
      key: "performance",
      icon: BoltIcon,
      path: "/design/performance",
      gradient: "from-warning to-accent",
    },
  ];

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
            <PaintBrushIcon className="h-5 w-5 text-primary mr-2" />
            <span className="text-primary font-semibold">{t("badge")}</span>
          </div>

          <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
            {appName}
          </h1>

          <p
            className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}
          >
            {t("intro", { appName })}
          </p>

          {/* System Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-primary mb-1`}>
                {Object.keys(designTokens.typography.family).length}
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.fontFamilies")}
              </div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-success mb-1`}>
                {Object.keys(designTokens.typography.size).length}
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.textSizes")}
              </div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-info mb-1`}>
                {Object.keys(designTokens.spacing).length}
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.spacingUnits")}
              </div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-warning mb-1`}>
                {Object.keys(designTokens.radius).length}
              </div>
              <div className={textVariants.caption.default()}>
                {t("stats.borderRadius")}
              </div>
            </div>
          </div>
        </div>

        {/* Appearance + design-theme switchers + live preview */}
        <div className="mb-8 flex flex-wrap items-center justify-end gap-4">
          <ThemeModeSwitcher />
          <ThemeSwitcher />
        </div>
        <div className="mb-12">
          <ThemePreview key={themeName} />
        </div>

        {/* Design Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {designAreas.map((area) => {
            const title = t(`areas.${area.key}.title`);
            const features = t(`areas.${area.key}.features`, {
              returnObjects: true,
            }) as string[];
            return (
              <LocalizedLink
                key={area.path}
                to={area.path}
                className={`${ui.background.surface} ${ui.border.default} border rounded-xl p-8 hover:shadow-xl transition-all duration-300 group`}
                aria-label={t("exploreAria", { title })}
              >
                <div className="flex items-start mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${area.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <area.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h2
                      className={`${textVariants.heading.h3()} mb-3 group-hover:text-primary transition-colors`}
                    >
                      {title}
                    </h2>
                    <p
                      className={`${textVariants.body.md()} text-muted-foreground`}
                    >
                      {t(`areas.${area.key}.description`)}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mr-3 flex-shrink-0" />
                      <span
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action */}
                <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-200">
                  <span className={textVariants.link.subtle()}>
                    {t("explore", { title })}
                  </span>
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </LocalizedLink>
            );
          })}
        </div>

        {/* System Information */}
        <div className={`${ui.background.subtle} rounded-xl p-8`}>
          <div className="flex items-center mb-4">
            <CubeTransparentIcon className="h-6 w-6 text-muted-foreground mr-3" />
            <h3 className={textVariants.heading.h4()}>
              {t("architecture.title")}
            </h3>
          </div>
          <p className={`${textVariants.body.md()} text-muted-foreground mb-6`}>
            {t("architecture.body", { appName })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`${textVariants.heading.h5()} mb-3`}>
                {t("architecture.tokensTitle")}
              </h4>
              <ul
                className={`${textVariants.body.sm()} text-muted-foreground space-y-1`}
              >
                {(
                  t("architecture.tokens", { returnObjects: true }) as string[]
                ).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`${textVariants.heading.h5()} mb-3`}>
                {t("architecture.implementationTitle")}
              </h4>
              <ul
                className={`${textVariants.body.sm()} text-muted-foreground space-y-1`}
              >
                {(
                  t("architecture.implementation", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignSystemPage;
