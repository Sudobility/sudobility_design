import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InboxIcon,
  StarIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Section } from "@sudobility/components";
import { cn } from "@sudobility/components";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const DataDisplayPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("dataDisplay");
  const [sortColumn, setSortColumn] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickStartExamples = [
    {
      key: "dataTable",
      code: `// Data Table
<div className={variants.dataDisplay.table.container()}>
  <div className={variants.dataDisplay.table.wrapper()}>
    <table className={variants.dataDisplay.table.table()}>
      <thead className={variants.dataDisplay.table.thead()}>
        <tr>
          <th className={variants.dataDisplay.table.thSortable()}>
            Name <ChevronUpIcon className="h-3 w-3 inline" />
          </th>
          <th className={variants.dataDisplay.table.th()}>Email</th>
          <th className={variants.dataDisplay.table.th()}>Status</th>
        </tr>
      </thead>
      <tbody className={variants.dataDisplay.table.tbody()}>
        <tr className={variants.dataDisplay.table.tr()}>
          <td className={variants.dataDisplay.table.td()}>John Doe</td>
          <td className={variants.dataDisplay.table.td()}>john@example.com</td>
          <td className={variants.dataDisplay.table.td()}>Active</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    },
    {
      key: "emailList",
      code: `// Email List
<div className={variants.dataDisplay.list.container()}>
  <ul className={variants.dataDisplay.list.ul()}>
    <li className={variants.dataDisplay.list.emailItem()}>
      <div className="flex-1">
        <div className="font-medium">Subject Line</div>
        <div className="text-sm text-muted-foreground">sender@example.com</div>
      </div>
      <div className="text-sm text-muted-foreground">2h ago</div>
    </li>
    <li className={variants.dataDisplay.list.emailItemRead()}>
      <div className="flex-1">
        <div className="font-medium">Read Email</div>
        <div className="text-sm text-muted-foreground">sender@example.com</div>
      </div>
    </li>
  </ul>
</div>`,
    },
    {
      key: "keyValue",
      code: `// Key-Value Pairs
<div className={variants.dataDisplay.keyValue.container()}>
  <dl className={variants.dataDisplay.keyValue.list()}>
    <div className={variants.dataDisplay.keyValue.row()}>
      <dt className={variants.dataDisplay.keyValue.key()}>
        Wallet Address
      </dt>
      <dd className={variants.dataDisplay.keyValue.value()}>
        <code className={variants.dataDisplay.code.address()}>
          0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
        </code>
      </dd>
    </div>
    <div className={variants.dataDisplay.keyValue.row()}>
      <dt className={variants.dataDisplay.keyValue.key()}>Balance</dt>
      <dd className={variants.dataDisplay.keyValue.value()}>1.5 ETH</dd>
    </div>
  </dl>
</div>`,
    },
    {
      key: "statsGrid",
      code: `// Stats Grid
<div className={variants.dataDisplay.stats.container()}>
  <div className={variants.dataDisplay.stats.grid()}>
    <div className={variants.dataDisplay.stats.item()}>
      <p className={variants.dataDisplay.stats.label()}>Total Emails</p>
      <p className={variants.dataDisplay.stats.value()}>1,234</p>
      <p className={cn(
        variants.dataDisplay.stats.change(),
        variants.dataDisplay.stats.changePositive()
      )}>
        <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
        12.5% from last month
      </p>
    </div>
  </div>
</div>`,
    },
  ];

  // Sample data for demos
  const tableData = [
    {
      id: 1,
      name: t("sampleData.table.1.name"),
      email: "alice@example.com",
      balance: "2.5 ETH",
      status: t("tables.status.active"),
      date: "2024-01-15",
    },
    {
      id: 2,
      name: t("sampleData.table.2.name"),
      email: "bob@example.com",
      balance: "1.2 SOL",
      status: t("tables.status.active"),
      date: "2024-01-14",
    },
    {
      id: 3,
      name: t("sampleData.table.3.name"),
      email: "charlie@example.com",
      balance: "0.8 ETH",
      status: t("tables.status.pending"),
      date: "2024-01-13",
    },
    {
      id: 4,
      name: t("sampleData.table.4.name"),
      email: "david@example.com",
      balance: "5.0 ETH",
      status: t("tables.status.active"),
      date: "2024-01-12",
    },
    {
      id: 5,
      name: t("sampleData.table.5.name"),
      email: "eve@example.com",
      balance: "3.3 ETH",
      status: t("tables.status.inactive"),
      date: "2024-01-11",
    },
  ];

  const emailData = [
    {
      id: 1,
      sender: "noreply@etherscan.io",
      time: "2h ago",
      read: false,
      starred: true,
    },
    {
      id: 2,
      sender: "updates@opensea.io",
      time: "5h ago",
      read: false,
      starred: false,
    },
    {
      id: 3,
      sender: "security@metamask.io",
      time: "1d ago",
      read: true,
      starred: false,
    },
    {
      id: 4,
      sender: "report@aave.com",
      time: "2d ago",
      read: true,
      starred: true,
    },
    {
      id: 5,
      sender: "governance@dao.eth",
      time: "3d ago",
      read: true,
      starred: false,
    },
  ];

  const timelineData = [
    {
      id: 1,
      time: "2024-01-01 10:00 AM",
      status: "complete",
    },
    {
      id: 2,
      time: "2024-01-01 10:15 AM",
      status: "complete",
    },
    {
      id: 3,
      time: "2024-01-01 11:00 AM",
      status: "complete",
    },
    {
      id: 4,
      time: "2024-01-02 2:00 PM",
      status: "active",
    },
    {
      id: 5,
      time: "Pending",
      status: "pending",
    },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
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
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <TableCellsIcon className="h-5 w-5 text-primary mr-2" />
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
                      {t(`quickStart.examples.${example.key}.title`)}
                    </h3>
                    <p
                      className={`${textVariants.body.sm()} text-muted-foreground`}
                    >
                      {t(`quickStart.examples.${example.key}.description`)}
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

          {/* Interactive Table Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("tables.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("tables.cardTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("tables.cardDescription")}
                </p>
              </div>

              <div className={variants.dataDisplay.table.wrapper()}>
                <table className={variants.dataDisplay.table.table()}>
                  <thead className={variants.dataDisplay.table.thead()}>
                    <tr>
                      <th className={variants.dataDisplay.table.th()}>
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th
                        className={variants.dataDisplay.table.thSortable()}
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          {t("tables.columns.name")}
                          {sortColumn === "name" &&
                            (sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-3 w-3 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-3 w-3 ml-1" />
                            ))}
                        </div>
                      </th>
                      <th className={variants.dataDisplay.table.th()}>
                        {t("tables.columns.email")}
                      </th>
                      <th className={variants.dataDisplay.table.th()}>
                        {t("tables.columns.balance")}
                      </th>
                      <th className={variants.dataDisplay.table.th()}>
                        {t("tables.columns.status")}
                      </th>
                      <th
                        className={variants.dataDisplay.table.thSortable()}
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center">
                          {t("tables.columns.date")}
                          {sortColumn === "date" &&
                            (sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-3 w-3 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-3 w-3 ml-1" />
                            ))}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className={variants.dataDisplay.table.tbody()}>
                    {tableData.map((row) => (
                      <tr
                        key={row.id}
                        className={
                          selectedRow === row.id
                            ? variants.dataDisplay.table.trSelected()
                            : variants.dataDisplay.table.tr()
                        }
                        onClick={() => setSelectedRow(row.id)}
                      >
                        <td className={variants.dataDisplay.table.td()}>
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedRow === row.id}
                            onChange={() => {}}
                          />
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <span className="text-primary text-sm font-medium">
                                {row.name[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="font-medium">{row.name}</div>
                          </div>
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          <code className={variants.dataDisplay.code.inline()}>
                            {row.email}
                          </code>
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          {row.balance}
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          <span
                            className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              row.status === "Active" &&
                                "bg-success/10 text-success",
                              row.status === "Pending" &&
                                "bg-warning/10 text-warning",
                              row.status === "Inactive" &&
                                "bg-muted text-muted-foreground",
                            )}
                          >
                            {t(`tables.status.${row.status.toLowerCase()}`)}
                          </span>
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          {row.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* Email List Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("lists.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("lists.cardTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("lists.cardDescription")}
                </p>
              </div>

              <div className={variants.dataDisplay.list.container()}>
                <ul className={variants.dataDisplay.list.ul()}>
                  {emailData.map((email) => (
                    <li
                      key={email.id}
                      className={
                        selectedEmail === email.id
                          ? variants.dataDisplay.list.emailItemSelected()
                          : email.read
                            ? variants.dataDisplay.list.emailItemRead()
                            : variants.dataDisplay.list.emailItem()
                      }
                      onClick={() => setSelectedEmail(email.id)}
                    >
                      <button
                        className="mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle star
                        }}
                      >
                        {email.starred ? (
                          <StarSolid className="h-5 w-5 text-warning" />
                        ) : (
                          <StarIcon className="h-5 w-5 text-muted-foreground hover:text-warning" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={cn(
                              "text-sm font-medium truncate",
                              !email.read && "font-semibold",
                            )}
                          >
                            {t(`lists.emails.${email.id}.subject`)}
                          </p>
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                            {email.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {email.sender}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {t(`lists.emails.${email.id}.preview`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Grid Layouts */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("gridLayouts.heading")}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("gridLayouts.statsGrid.heading")}
                </h3>
                <div className={variants.dataDisplay.stats.container()}>
                  <div className={variants.dataDisplay.stats.grid()}>
                    <div className={variants.dataDisplay.stats.item()}>
                      <p className={variants.dataDisplay.stats.label()}>
                        {t("gridLayouts.statsGrid.totalEmails")}
                      </p>
                      <p className={variants.dataDisplay.stats.value()}>
                        1,234
                      </p>
                      <p
                        className={cn(
                          variants.dataDisplay.stats.change(),
                          variants.dataDisplay.stats.changePositive(),
                        )}
                      >
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1 inline" />
                        {t("gridLayouts.statsGrid.totalEmailsChange")}
                      </p>
                    </div>
                    <div className={variants.dataDisplay.stats.item()}>
                      <p className={variants.dataDisplay.stats.label()}>
                        {t("gridLayouts.statsGrid.activeContacts")}
                      </p>
                      <p className={variants.dataDisplay.stats.value()}>89</p>
                      <p
                        className={cn(
                          variants.dataDisplay.stats.change(),
                          variants.dataDisplay.stats.changePositive(),
                        )}
                      >
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1 inline" />
                        {t("gridLayouts.statsGrid.activeContactsChange")}
                      </p>
                    </div>
                    <div className={variants.dataDisplay.stats.item()}>
                      <p className={variants.dataDisplay.stats.label()}>
                        {t("gridLayouts.statsGrid.storageUsed")}
                      </p>
                      <p className={variants.dataDisplay.stats.value()}>
                        2.4GB
                      </p>
                      <p
                        className={cn(
                          variants.dataDisplay.stats.change(),
                          variants.dataDisplay.stats.changeNegative(),
                        )}
                      >
                        <ArrowTrendingDownIcon className="h-4 w-4 mr-1 inline" />
                        {t("gridLayouts.statsGrid.storageUsedChange")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("gridLayouts.cardGrid.heading")}
                </h3>
                <div className={variants.dataDisplay.grid.threeColumn()}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <InboxIcon className="h-8 w-8 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          #{i}
                        </span>
                      </div>
                      <h4 className={textVariants.heading.h4()}>
                        {t("gridLayouts.cardGrid.cardTitle", { number: i })}
                      </h4>
                      <p
                        className={`${textVariants.body.sm()} text-muted-foreground mt-2`}
                      >
                        {t("gridLayouts.cardGrid.cardContent")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Key-Value Display */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("keyValue.heading")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("keyValue.userProfile.heading")}
                </h3>
                <div className={variants.dataDisplay.keyValue.container()}>
                  <dl className={variants.dataDisplay.keyValue.list()}>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.userProfile.fullName")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        {t("keyValue.userProfile.fullNameValue")}
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.userProfile.ensName")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        alice.eth
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.userProfile.walletAddress")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <code className={variants.dataDisplay.code.address()}>
                          0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
                        </code>
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.userProfile.email")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        alice@{emailDomain}
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.userProfile.accountStatus")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
                          {t("keyValue.userProfile.verified")}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("keyValue.transactionDetails.heading")}
                </h3>
                <div className={variants.dataDisplay.keyValue.container()}>
                  <dl className={variants.dataDisplay.keyValue.list()}>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.transactionDetails.transactionHash")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <code className={variants.dataDisplay.code.hash()}>
                          0x123abc...def789
                        </code>
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.transactionDetails.blockNumber")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        18,234,567
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.transactionDetails.gasUsed")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        21,000
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        {t("keyValue.transactionDetails.status")}
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <span className="flex items-center text-success">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          {t("keyValue.transactionDetails.success")}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </Section>

          {/* Code Display */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("codeDisplay.heading")}
            </h2>

            <div className="space-y-8">
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("codeDisplay.inlineCode.heading")}
                </h3>
                <p className={textVariants.body.md()}>
                  {t("codeDisplay.inlineCode.textStart")}
                  <code className={variants.dataDisplay.code.inline()}>
                    variants.dataDisplay.code.inline()
                  </code>
                  {t("codeDisplay.inlineCode.textMiddle")}
                  <code className={variants.dataDisplay.code.address()}>
                    0x742d...4e88
                  </code>
                  {t("codeDisplay.inlineCode.textMiddle2")}
                  <code className={variants.dataDisplay.code.hash()}>
                    0xabc123...def456
                  </code>
                  {t("codeDisplay.inlineCode.textEnd")}
                </p>
              </div>

              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  {t("codeDisplay.codeBlock.heading")}
                </h3>
                <pre className={variants.dataDisplay.code.block()}>
                  <code>{`// Smart Contract Example
pragma solidity ^0.8.0;

contract EmailRegistry {
    mapping(address => string) public emails;
    
    function setEmail(string memory _email) public {
        emails[msg.sender] = _email;
    }
    
    function getEmail(address _user) public view returns (string memory) {
        return emails[_user];
    }
}`}</code>
                </pre>
              </div>
            </div>
          </Section>

          {/* Timeline */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("timeline.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
            >
              <h3 className={`${textVariants.heading.h3()} mb-6`}>
                {t("timeline.cardTitle")}
              </h3>

              <div className={variants.dataDisplay.timeline.container()}>
                <ul className={variants.dataDisplay.timeline.list()}>
                  {timelineData.map((item, index) => (
                    <li
                      key={item.id}
                      className={
                        index === timelineData.length - 1
                          ? variants.dataDisplay.timeline.itemLast()
                          : variants.dataDisplay.timeline.item()
                      }
                    >
                      {index !== timelineData.length - 1 && (
                        <span
                          className={variants.dataDisplay.timeline.connector()}
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex items-start">
                        <div
                          className={cn(
                            variants.dataDisplay.timeline.dot(),
                            item.status === "complete" && "bg-success",
                            item.status === "active" && "bg-primary",
                            item.status === "pending" && "bg-muted-foreground",
                          )}
                        >
                          {item.status === "complete" && (
                            <CheckCircleIcon className="h-5 w-5 text-success-foreground" />
                          )}
                          {item.status === "active" && (
                            <ClockIcon className="h-5 w-5 text-primary-foreground" />
                          )}
                          {item.status === "pending" && (
                            <ExclamationTriangleIcon className="h-5 w-5 text-foreground" />
                          )}
                        </div>
                        <div
                          className={variants.dataDisplay.timeline.content()}
                        >
                          <p className={variants.dataDisplay.timeline.time()}>
                            {item.time}
                          </p>
                          <p className={variants.dataDisplay.timeline.title()}>
                            {t(`timeline.items.${item.id}.title`)}
                          </p>
                          <p
                            className={variants.dataDisplay.timeline.description()}
                          >
                            {t(`timeline.items.${item.id}.description`)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Empty States */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("emptyStates.heading")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
              >
                <div className={variants.dataDisplay.empty.container()}>
                  <InboxIcon className={variants.dataDisplay.empty.icon()} />
                  <h3 className={variants.dataDisplay.empty.title()}>
                    {t("emptyStates.noEmails.title")}
                  </h3>
                  <p className={variants.dataDisplay.empty.description()}>
                    {t("emptyStates.noEmails.description")}
                  </p>
                  <div className={variants.dataDisplay.empty.action()}>
                    <Button>{t("emptyStates.noEmails.action")}</Button>
                  </div>
                </div>
              </div>

              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
              >
                <div className={variants.dataDisplay.empty.container()}>
                  <TableCellsIcon
                    className={variants.dataDisplay.empty.icon()}
                  />
                  <h3 className={variants.dataDisplay.empty.title()}>
                    {t("emptyStates.noData.title")}
                  </h3>
                  <p className={variants.dataDisplay.empty.description()}>
                    {t("emptyStates.noData.description")}
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Web3 Data Patterns */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("web3.heading")}
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  {t("web3.cardTitle")}
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  {t("web3.cardDescription")}
                </p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("web3.addressDisplay.heading")}
                  </h4>
                  <div className="space-y-2">
                    <div className={variants.dataDisplay.keyValue.inline()}>
                      <span
                        className={variants.dataDisplay.keyValue.inlineKey()}
                      >
                        {t("web3.addressDisplay.full")}
                      </span>
                      <code className={variants.dataDisplay.code.address()}>
                        0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
                      </code>
                      <button className="ml-2">
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                    <div className={variants.dataDisplay.keyValue.inline()}>
                      <span
                        className={variants.dataDisplay.keyValue.inlineKey()}
                      >
                        {t("web3.addressDisplay.truncated")}
                      </span>
                      <code className={variants.dataDisplay.code.address()}>
                        0x742d...bEb7
                      </code>
                    </div>
                    <div className={variants.dataDisplay.keyValue.inline()}>
                      <span
                        className={variants.dataDisplay.keyValue.inlineKey()}
                      >
                        {t("web3.addressDisplay.ens")}
                      </span>
                      <span
                        className={variants.dataDisplay.keyValue.inlineValue()}
                      >
                        alice.eth
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("web3.tokenBalances.heading")}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        2.5
                      </div>
                      <div className="text-sm text-muted-foreground">ETH</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        1,234
                      </div>
                      <div className="text-sm text-muted-foreground">USDC</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        5.2
                      </div>
                      <div className="text-sm text-muted-foreground">SOL</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        420
                      </div>
                      <div className="text-sm text-muted-foreground">MATIC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Implementation Notes */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("implementationNotes.heading")}
            </h2>

            <div className={`${ui.background.subtle} rounded-xl p-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("implementationNotes.performance.heading")}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {(
                      t("implementationNotes.performance.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    {t("implementationNotes.accessibility.heading")}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {(
                      t("implementationNotes.accessibility.items", {
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
    </>
  );
};

export default DataDisplayPage;
