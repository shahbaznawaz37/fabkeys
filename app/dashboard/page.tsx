import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  FileArchive,
  FileSpreadsheet,
  FileText,
  Folder,
  Gauge,
  HardHat,
  Home,
  IndianRupee,
  Menu,
  Package,
  Printer,
  ReceiptText,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Truck,
  Upload,
  WalletCards,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Projects", icon: BriefcaseBusiness },
  { label: "Cost Tracking", icon: ChartNoAxesColumnIncreasing },
  { label: "Materials", icon: Package },
  { label: "Labor", icon: HardHat },
  { label: "Expenses", icon: WalletCards },
  { label: "Documents", icon: Folder },
  { label: "Delivery Notes", icon: Truck },
  { label: "Gate Pass", icon: ShieldCheck },
  { label: "Reports", icon: ReceiptText },
  { label: "Settings", icon: Settings },
]

const stats = [
  {
    label: "Active Projects",
    value: "12",
    helper: "View all projects",
    icon: BriefcaseBusiness,
    tone: "blue",
  },
  {
    label: "In Progress",
    value: "8",
    helper: "On track",
    icon: Clock3,
    tone: "emerald",
  },
  {
    label: "Delayed",
    value: "2",
    helper: "Needs attention",
    icon: Gauge,
    tone: "orange",
  },
  {
    label: "Delivered",
    value: "15",
    helper: "This month",
    icon: CheckCircle2,
    tone: "violet",
  },
  {
    label: "Total Cost",
    value: "₹ 18,76,540",
    helper: "View details",
    icon: IndianRupee,
    tone: "blue",
  },
  {
    label: "Profit",
    value: "₹ 4,35,210",
    helper: "23.2% of revenue",
    icon: CircleDollarSign,
    tone: "emerald",
  },
]

const projects = [
  {
    id: "P-1001",
    name: "Warehouse Structure",
    client: "ABC Infra Pvt Ltd",
    progress: 65,
    budget: "₹ 12,50,000",
    actual: "₹ 8,45,000",
    status: "In Progress",
  },
  {
    id: "P-1002",
    name: "Pipe Rack System",
    client: "Reliance Industries",
    progress: 40,
    budget: "₹ 8,75,000",
    actual: "₹ 3,20,000",
    status: "In Progress",
  },
  {
    id: "P-1003",
    name: "Platform & Handrail",
    client: "Tata Projects",
    progress: 80,
    budget: "₹ 6,20,000",
    actual: "₹ 5,30,000",
    status: "In Progress",
  },
  {
    id: "P-1004",
    name: "Structural Steel Work",
    client: "Larsen & Toubro",
    progress: 25,
    budget: "₹ 15,00,000",
    actual: "₹ 3,60,000",
    status: "Delayed",
  },
  {
    id: "P-1005",
    name: "Conveyor Support",
    client: "Vedanta Ltd",
    progress: 100,
    budget: "₹ 4,80,000",
    actual: "₹ 4,55,000",
    status: "Delivered",
  },
]

const costRows = [
  { label: "Labor Cost", amount: "₹ 6,45,000", percent: "34.4%", color: "bg-blue-600" },
  { label: "Material Cost", amount: "₹ 9,80,000", percent: "52.2%", color: "bg-emerald-500" },
  { label: "Other Expenses", amount: "₹ 2,51,540", percent: "13.4%", color: "bg-orange-400" },
]

const activities = [
  { icon: HardHat, title: "Labor entry added for P-1001", meta: "by Ramesh | 2h ago" },
  { icon: Package, title: "Material issued for P-1002", meta: "by Store | 4h ago" },
  { icon: Truck, title: "Delivery note created DN-0456", meta: "for P-1003 | 6h ago" },
]

const docs = [
  { name: "General Arrangement Drawing.pdf", meta: "2.4 MB  Uploaded on 10 May 2024", icon: FileText, tone: "text-red-500" },
  { name: "Fabrication Drawing (01).pdf", meta: "3.1 MB  Uploaded on 11 May 2024", icon: FileText, tone: "text-red-500" },
  { name: "BOQ / Estimate.xlsx", meta: "1.2 MB  Uploaded on 10 May 2024", icon: FileSpreadsheet, tone: "text-emerald-600" },
  { name: "Material Specification.pdf", meta: "1.8 MB  Uploaded on 12 May 2024", icon: FileText, tone: "text-orange-500" },
  { name: "Site Images.zip", meta: "25.6 MB  Uploaded on 15 May 2024", icon: FileArchive, tone: "text-amber-500" },
]

const toneClasses = {
  blue: "bg-blue-600 text-white ring-blue-500/20",
  emerald: "bg-emerald-500 text-white ring-emerald-500/20",
  orange: "bg-orange-400 text-white ring-orange-400/20",
  violet: "bg-violet-600 text-white ring-violet-500/20",
}

export default function Page() {
  return (
    <SidebarProvider className="min-h-svh bg-slate-50 text-slate-950">
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-slate-50">
        <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center gap-3 px-4 md:px-6">
            <SidebarTrigger className="shrink-0" />
            <h1 className="mr-auto text-xl font-semibold tracking-normal md:text-2xl">
              Dashboard
            </h1>
            <div className="relative hidden w-full max-w-xs md:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search project, client, docs..."
                className="h-9 rounded-lg pl-9"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </Button>
            <div className="grid size-9 place-items-center rounded-full bg-orange-100 text-sm font-semibold text-orange-900">
              AS
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto grid w-full max-w-[1500px] gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
              <section className="min-w-0 space-y-4">
                <StatsGrid />
                <ProjectOverview />
                <div className="grid gap-4 lg:grid-cols-2">
                  <ProjectCost />
                  <LaborEntry />
                </div>
              </section>

              <aside className="space-y-4">
                <CostSummary />
                <RecentActivities />
                <DeliveryNote />
                <DocumentsPanel />
              </aside>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function AppSidebar() {
  return (
    <Sidebar
      className="border-r-0 [--sidebar:#071521] [--sidebar-accent:#102337] [--sidebar-accent-foreground:#fff] [--sidebar-border:#1e3346] [--sidebar-foreground:#fff]"
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <Building2 className="size-6 text-sky-200" />
          </div>
          <div className="min-w-0 text-white group-data-[collapsible=icon]:hidden">
            <div className="truncate text-base font-semibold tracking-wide">FAB SHOP</div>
            <div className="truncate text-xs text-slate-300">Project OS</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    isActive={item.active}
                    className={cn(
                      "h-10 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white data-active:bg-blue-600 data-active:text-white",
                      item.active && "shadow-sm shadow-blue-950/40"
                    )}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-orange-100 text-xs font-bold text-orange-900">
            AS
          </div>
          <div className="min-w-0 flex-1 text-white group-data-[collapsible=icon]:hidden">
            <div className="truncate text-sm font-medium">Amit Sharma</div>
            <div className="truncate text-xs text-slate-400">Admin</div>
          </div>
          <ChevronDown className="size-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function StatsGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-lg py-4 shadow-sm">
          <CardContent className="flex items-start gap-3 px-4">
            <div className={cn("grid size-10 shrink-0 place-items-center rounded-lg ring-4", toneClasses[stat.tone as keyof typeof toneClasses])}>
              <stat.icon className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-600">{stat.label}</div>
              <div className="mt-1 text-2xl font-bold tracking-normal">{stat.value}</div>
              <div
                className={cn(
                  "mt-3 text-xs font-medium",
                  stat.tone === "emerald" && "text-emerald-700",
                  stat.tone === "orange" && "text-red-600",
                  stat.tone === "blue" && "text-blue-700",
                  stat.tone === "violet" && "text-slate-600"
                )}
              >
                {stat.helper}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProjectOverview() {
  return (
    <Card className="rounded-lg py-0">
      <CardHeader className="border-b px-4 py-4">
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium text-slate-500">
            <tr>
              <th className="px-4 py-3">Project Name</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Actual Cost</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="px-4 py-4 font-medium">
                  {project.id} | {project.name}
                </td>
                <td className="px-4 py-4 text-slate-600">{project.client}</td>
                <td className="px-4 py-4">
                  <Progress value={project.progress} status={project.status} />
                </td>
                <td className="px-4 py-4">{project.budget}</td>
                <td className="px-4 py-4">{project.actual}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={project.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t px-4 py-4">
          <Button variant="ghost" className="h-8 px-0 text-blue-700 hover:bg-transparent hover:text-blue-800">
            View all projects
            <Send className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CostSummary() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm">Cost Summary (This Month)</CardTitle>
      </CardHeader>
      <CardContent className="grid items-center gap-5 sm:grid-cols-[10rem_1fr] xl:grid-cols-1 2xl:grid-cols-[10rem_1fr]">
        <Donut label="Total Cost" value="₹ 18,76,540" />
        <div className="space-y-3">
          {costRows.map((row) => (
            <div key={row.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-xs">
              <div className="flex min-w-0 items-center gap-2">
                <span className={cn("size-2.5 rounded-full", row.color)} />
                <span className="truncate font-medium">{row.label}</span>
              </div>
              <span className="text-slate-500">{row.percent}</span>
              <div className="col-span-2 pl-4 font-semibold">{row.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentActivities() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.title} className="flex gap-3">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
              <activity.icon className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{activity.title}</div>
              <div className="text-xs text-slate-500">{activity.meta}</div>
            </div>
          </div>
        ))}
        <Button variant="ghost" className="h-8 px-0 text-blue-700 hover:bg-transparent">
          View all activities
          <Send className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  )
}

function ProjectCost() {
  const rows = [
    ["Labor Cost", "₹ 4,00,000", "₹ 2,85,000", "₹ 1,15,000", "71%", "bg-blue-600"],
    ["Material Cost", "₹ 6,50,000", "₹ 4,80,000", "₹ 1,70,000", "74%", "bg-emerald-500"],
    ["Other Expenses", "₹ 2,00,000", "₹ 80,000", "₹ 1,20,000", "40%", "bg-orange-500"],
    ["Total", "₹ 12,50,000", "₹ 8,45,000", "₹ 4,05,000", "68%", "bg-slate-400"],
  ]

  return (
    <Card className="rounded-lg py-0">
      <CardHeader className="border-b px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm">
            <Menu className="size-4 rotate-90" />
          </Button>
          <CardTitle className="text-base">P-1001 | Warehouse Structure</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 py-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Budget", "₹ 12,50,000"],
            ["Actual Cost", "₹ 8,45,000"],
            ["Balance", "₹ 4,05,000"],
            ["Progress", "65%"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border p-3">
              <div className="text-xs text-slate-500">{label}</div>
              <div className="mt-2 font-semibold">{value}</div>
              {label === "Progress" && <Progress value={65} />}
            </div>
          ))}
        </div>
        <Tabs defaultValue="cost">
          <TabsList variant="line" className="w-full justify-start border-b">
            <TabsTrigger value="cost" className="max-w-32 justify-start px-2">Cost Summary</TabsTrigger>
            <TabsTrigger value="labor" className="max-w-24 justify-start px-2">Labor</TabsTrigger>
            <TabsTrigger value="materials" className="max-w-24 justify-start px-2">Materials</TabsTrigger>
            <TabsTrigger value="expenses" className="max-w-24 justify-start px-2">Expenses</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                {["Category", "Budget", "Actual", "Balance", "% of Budget"].map((head) => (
                  <th key={head} className="px-3 py-3 text-left font-medium">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-t last:font-semibold">
                  {row.slice(0, 4).map((cell) => (
                    <td key={cell} className="px-3 py-4">{cell}</td>
                  ))}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(row[4] === "40%" && "text-red-600", row[4] === "74%" && "text-emerald-600")}>{row[4]}</span>
                      <div className="h-1.5 w-16 rounded-full bg-slate-200">
                        <div className={cn("h-full rounded-full", row[5])} style={{ width: row[4] }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function LaborEntry() {
  return (
    <Card className="rounded-lg py-0">
      <CardHeader className="border-b px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">Add Labor Entry</CardTitle>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Save</Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 px-4 py-4">
        <Field label="Project" value="P-1001 | Warehouse Structure" />
        <Field label="Date" value="20 May 2024" />
        <Field label="Worker / Team" value="Ramesh Welding Team" wide />
        <Field label="Category" value="Welding" wide />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Hours" value="8" />
          <Field label="Rate (per hour)" value="₹ 350" />
        </div>
        <Field label="Total" value="₹ 2,800" wide strong />
        <Field label="Remarks" value="Welding of column base plate" wide />
      </CardContent>
    </Card>
  )
}

function DeliveryNote() {
  return (
    <Card className="rounded-lg py-0">
      <CardHeader className="border-b px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">DN-0456</CardTitle>
          <div className="flex items-center gap-1">
            <StatusBadge status="Delivered" />
            <Button variant="ghost" size="icon-sm"><Printer className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm"><Upload className="size-4" /></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 py-4">
        <div className="grid grid-cols-[6rem_1fr] gap-y-2 text-sm">
          <span className="text-slate-500">Project</span><span>P-1003 | Platform & Handrail</span>
          <span className="text-slate-500">Client</span><span>Tata Projects</span>
          <span className="text-slate-500">Delivery Date</span><span>19 May 2024</span>
          <span className="text-slate-500">Vehicle No.</span><span>MH 12 AB 1234</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Item</th>
              <th className="px-3 py-2 text-left font-medium">Description</th>
              <th className="px-3 py-2 text-left font-medium">Qty</th>
              <th className="px-3 py-2 text-left font-medium">Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "Handrail Pipe 48.3 mm", "20", "Nos"],
              ["2", "MS Plate 10 mm", "15", "Nos"],
              ["3", "Base Plate 250x250x10 mm", "10", "Nos"],
            ].map((row) => (
              <tr key={row[0]} className="border-t">
                {row.map((cell) => <td key={cell} className="px-3 py-3">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">Received By (Client)</div>
          <div>Name: <span className="ml-5">Rajesh Kumar</span></div>
          <div className="flex items-end gap-6">
            <span>Signature:</span>
            <span className="font-mono text-3xl italic text-blue-600">Rajesh</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentsPanel() {
  return (
    <Card className="rounded-lg py-0">
      <CardContent className="px-4 py-4">
        <Tabs defaultValue="drawings">
          <TabsList variant="line" className="mb-4 w-full justify-start border-b">
            <TabsTrigger value="drawings" className="px-2">Drawings</TabsTrigger>
            <TabsTrigger value="estimates" className="px-2">Estimates</TabsTrigger>
            <TabsTrigger value="photos" className="px-2">Photos</TabsTrigger>
            <TabsTrigger value="others" className="px-2">Others</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-2">
          {docs.map((doc) => (
            <div key={doc.name} className="flex items-center gap-3 rounded-lg border p-3">
              <doc.icon className={cn("size-6 shrink-0", doc.tone)} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{doc.name}</div>
                <div className="truncate text-xs text-slate-500">{doc.meta}</div>
              </div>
              <Button variant="ghost" size="icon-sm" className="text-blue-700">
                <Download className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
          Upload Document
        </Button>
      </CardContent>
    </Card>
  )
}

function Donut({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative mx-auto grid size-40 place-items-center rounded-full bg-[conic-gradient(#2563eb_0_34.4%,#22c55e_34.4%_86.6%,#f59e0b_86.6%_100%)]">
      <div className="grid size-24 place-items-center rounded-full bg-white text-center shadow-inner">
        <div>
          <div className="text-xs text-slate-500">{label}</div>
          <div className="text-sm font-bold">{value}</div>
        </div>
      </div>
    </div>
  )
}

function Progress({ value, status }: { value: number; status?: string }) {
  return (
    <div className="flex min-w-[8rem] items-center gap-2">
      <span className="w-8 text-xs font-medium">{value}%</span>
      <div className="h-1.5 flex-1 rounded-full bg-slate-200">
        <div
          className={cn(
            "h-full rounded-full",
            status === "Delivered" ? "bg-emerald-500" : status === "Delayed" ? "bg-red-500" : "bg-blue-600"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md border-0 px-2.5",
        status === "Delivered" && "bg-emerald-100 text-emerald-700",
        status === "Delayed" && "bg-red-100 text-red-700",
        status === "In Progress" && "bg-blue-100 text-blue-700"
      )}
    >
      {status}
    </Badge>
  )
}

function Field({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  wide?: boolean
  strong?: boolean
}) {
  return (
    <label className="grid gap-1 text-xs text-slate-500">
      {label}
      <div className={cn("rounded-md border bg-white px-3 py-2 text-sm text-slate-900", strong && "bg-slate-50 font-semibold")}>
        {value}
      </div>
    </label>
  )
}
