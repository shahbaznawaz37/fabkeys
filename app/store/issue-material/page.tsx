import {
  Barcode,
  Bell,
  BookOpenCheck,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Gauge,
  HardHat,
  History,
  Layers3,
  Minus,
  Package,
  PackageCheck,
  Plus,
  ScanLine,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  Wrench,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const materialFilters = ["All", "Steel", "Consumables", "Fasteners", "Tools", "Others"]

const materials = [
  {
    name: "MS Plate 10mm",
    code: "ST-PL-001 | Steel",
    price: "Rs 64.50 / Kg",
    stock: "540 Kg",
    icon: Layers3,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    name: "MS Angle 50x50x6mm",
    code: "ST-AN-002 | Steel",
    price: "Rs 61.20 / Kg",
    stock: "320 Kg",
    icon: Gauge,
    tone: "bg-zinc-100 text-zinc-700",
  },
  {
    name: "Welding Rod E6013",
    code: "WR-001 | Consumable",
    price: "Rs 118.00 / Kg",
    stock: "125 Kg",
    icon: Wrench,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    name: "Cutting Disc 4 inch",
    code: "CD-001 | Consumable",
    price: "Rs 17.50 / Pcs",
    stock: "210 Pcs",
    icon: ScanLine,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Gas Cylinder (Oxygen)",
    code: "GC-001 | Gas",
    price: "Rs 2,320.00 / Nos",
    stock: "16 Nos",
    icon: ShieldCheck,
    tone: "bg-teal-100 text-teal-700",
  },
  {
    name: "Gloves",
    code: "GL-001 | Safety",
    price: "Rs 32.00 / Pair",
    stock: "260 Pair",
    icon: HardHat,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    name: "Cleaning Cloth",
    code: "CC-001 | Consumable",
    price: "Rs 8.00 / Pcs",
    stock: "500 Pcs",
    icon: Package,
    tone: "bg-sky-100 text-sky-700",
  },
]

const cartItems = [
  ["1", "MS Plate 10mm", "ST-PL-001", "Kg", "540", "100", "64.50", "6,450.00"],
  ["2", "Welding Rod E6013", "WR-001", "Kg", "125", "20", "118.00", "2,360.00"],
  ["3", "Cutting Disc 4 inch", "CD-001", "Pcs", "210", "30", "17.50", "525.00"],
  ["4", "Gloves", "GL-001", "Pair", "260", "20", "32.00", "640.00"],
]

export default function IssueMaterialPage() {
  return (
    <div className="min-h-svh bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
        <div className="flex h-20 items-center gap-4 px-4 md:px-6">
            <div className="mr-auto min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-normal md:text-2xl">
                Issue Material (POS)
              </h1>
              <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                Quick & easy material issue to project or misc
              </p>
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              <Button variant="outline" className="h-11 rounded-lg">
                <Barcode className="size-4" />
                Scan Barcode
              </Button>
              <Button variant="outline" className="h-11 rounded-lg">
                <History className="size-4" />
                Recent Issues
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="size-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="relative lg:hidden">
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </Button>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="grid size-10 place-items-center rounded-full bg-orange-100 text-sm font-semibold text-orange-900">
                AS
              </div>
              <div className="hidden min-w-0 xl:block">
                <div className="truncate text-sm font-semibold">Amit Sharma</div>
                <div className="truncate text-xs text-slate-500">Store Incharge</div>
              </div>
              <ChevronDown className="hidden size-4 text-slate-500 xl:block" />
            </div>
          </div>
      </header>

      <main className="p-4 md:p-6">
        <div className="grid w-full gap-4 2xl:grid-cols-[28rem_minmax(0,1fr)_20rem]">
          <MaterialSearch />
          <IssueCart />
          <IssueDetails />
        </div>
        <WorkflowStrip />
      </main>
    </div>
  )
}

function MaterialSearch() {
  return (
    <Card className="rounded-lg py-0 shadow-sm">
      <Tabs defaultValue="search">
        <CardHeader className="border-b p-0">
          <TabsList variant="line" className="h-12 w-full justify-start px-4">
            <TabsTrigger value="search" className="h-12 px-6 text-blue-700">
              Search Material
            </TabsTrigger>
            <TabsTrigger value="categories" className="h-12 px-6">
              Quick Categories
            </TabsTrigger>
          </TabsList>
        </CardHeader>
      </Tabs>
      <CardContent className="space-y-4 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search material name / scan barcode"
            className="h-11 rounded-lg pl-9 pr-10"
          />
          <ScanLine className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
        </div>
        <ScrollArea className="w-full pb-2">
          <div className="flex w-max gap-2">
            {materialFilters.map((filter) => (
              <Button
                key={filter}
                variant={filter === "All" ? "default" : "secondary"}
                size="sm"
                className={cn(
                  "h-9 rounded-lg px-4",
                  filter === "All" && "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {filter}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="h-[38rem] pr-3">
          <div className="space-y-0">
            {materials.map((material) => (
              <div key={material.name} className="flex items-center gap-3 border-t py-4 first:border-t-0">
                <div className={cn("grid size-14 shrink-0 place-items-center rounded-lg", material.tone)}>
                  <material.icon className="size-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{material.name}</div>
                  <div className="mt-1 truncate text-xs text-slate-500">{material.code}</div>
                  <div className="mt-1 font-semibold">{material.price}</div>
                </div>
                <div className="hidden text-xs md:block">
                  <Badge className="bg-emerald-100 text-emerald-700" variant="secondary">
                    In Stock
                  </Badge>
                  <div className="mt-2 text-slate-600">Available: {material.stock}</div>
                </div>
                <Button variant="outline" size="icon" className="size-9 rounded-lg border-blue-200 text-blue-700">
                  <Plus className="size-5" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function IssueCart() {
  return (
    <Card className="min-h-[38rem] rounded-lg py-0 shadow-sm">
      <CardHeader className="flex-row items-center justify-between border-b px-5 py-4">
        <CardTitle className="text-lg">
          Issue Cart <span className="font-normal text-slate-500">(4 Items)</span>
        </CardTitle>
        <Button variant="destructive" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100">
          <Trash2 className="size-4" />
          Clear Cart
        </Button>
      </CardHeader>
      <CardContent className="flex min-h-[34rem] flex-col p-0">
        <ScrollArea className="w-full">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-medium text-slate-600">
              <tr>
                {["#", "Material", "Unit", "Stock", "Qty", "Rate (Rs)", "Amount (Rs)", "Action"].map((head) => (
                  <th key={head} className="px-4 py-4 font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item[0]} className="border-t">
                  <td className="px-4 py-5">{item[0]}</td>
                  <td className="px-4 py-5">
                    <div className="font-semibold">{item[1]}</div>
                    <div className="mt-1 text-xs text-slate-500">{item[2]}</div>
                  </td>
                  <td className="px-4 py-5">{item[3]}</td>
                  <td className="px-4 py-5">{item[4]}</td>
                  <td className="px-4 py-5">
                    <div className="inline-flex h-10 overflow-hidden rounded-lg border">
                      <Button variant="ghost" size="icon-sm" className="h-10 rounded-none">
                        <Minus className="size-4" />
                      </Button>
                      <div className="grid w-14 place-items-center border-x bg-white">{item[5]}</div>
                      <Button variant="ghost" size="icon-sm" className="h-10 rounded-none">
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-5">{item[6]}</td>
                  <td className="px-4 py-5">{item[7]}</td>
                  <td className="px-4 py-5">
                    <Button variant="outline" size="icon-sm" className="border-red-200 text-red-600 hover:bg-red-50">
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <div className="mt-auto border-t p-5">
          <div className="mb-4 font-semibold">Cart Summary</div>
          <div className="grid gap-3 md:grid-cols-3">
            <SummaryCard icon={Users} label="Total Items" value="4" tone="blue" />
            <SummaryCard icon={BookOpenCheck} label="Total Quantity" value="170" tone="blue" />
            <SummaryCard icon={CircleDollarSign} label="Total Amount" value="Rs 9,975.00" tone="emerald" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function IssueDetails() {
  return (
    <aside className="space-y-3">
      <Card className="rounded-lg border-blue-200 py-0 shadow-sm">
        <CardHeader className="px-4 py-4">
          <CardTitle className="text-lg text-blue-950">Issue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 pb-4">
          <FieldLabel label="Project" required>
            <Select>
              <SelectTrigger className="h-11 w-full rounded-lg">
                <SelectValue placeholder="P-1001 | Warehouse Structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p1001">P-1001 | Warehouse Structure</SelectItem>
                <SelectItem value="p1002">P-1002 | Pipe Rack System</SelectItem>
              </SelectContent>
            </Select>
          </FieldLabel>
          <div className="flex items-start gap-2 text-xs font-medium text-emerald-700">
            <PackageCheck className="mt-0.5 size-4" />
            Project-wise materials will be issued to this project.
          </div>
          <FieldLabel label="Work Stage (Optional)">
            <Select>
              <SelectTrigger className="h-11 w-full rounded-lg">
                <SelectValue placeholder="Fabrication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fabrication">Fabrication</SelectItem>
                <SelectItem value="erection">Erection</SelectItem>
                <SelectItem value="finishing">Finishing</SelectItem>
              </SelectContent>
            </Select>
          </FieldLabel>
          <FieldLabel label="Issued By" required>
            <Select>
              <SelectTrigger className="h-11 w-full rounded-lg">
                <SelectValue placeholder="Amit Sharma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amit">Amit Sharma</SelectItem>
                <SelectItem value="store">Store Team</SelectItem>
              </SelectContent>
            </Select>
          </FieldLabel>
          <FieldLabel label="Issue Date" required>
            <div className="relative">
              <Input defaultValue="20/05/2024" className="h-11 rounded-lg pr-10" />
              <CalendarDays className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            </div>
          </FieldLabel>
          <FieldLabel label="Remarks (Optional)">
            <Textarea placeholder="Enter remarks" className="min-h-20 rounded-lg" />
          </FieldLabel>
        </CardContent>
      </Card>

      <Card className="rounded-lg border-emerald-100 bg-emerald-50/50 py-0 shadow-sm">
        <CardHeader className="px-4 py-4">
          <CardTitle className="text-sm text-emerald-800">Issue Split (Auto)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 px-4 pb-4 sm:grid-cols-2 2xl:grid-cols-1 min-[1660px]:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="text-sm font-semibold text-emerald-800">Project-wise Items</div>
            <div className="mt-3 text-xs text-emerald-700">3 Items</div>
            <div className="mt-3 text-xl font-semibold">Rs 9,335.00</div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="text-sm font-semibold text-amber-800">Misc Items</div>
            <div className="mt-3 text-xs text-amber-700">1 Item</div>
            <div className="mt-3 text-xl font-semibold">Rs 640.00</div>
          </div>
          <p className="text-center text-xs text-slate-500 sm:col-span-2 2xl:col-span-1 min-[1660px]:col-span-2">
            Misc items will be recorded as expense.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-lg py-0 shadow-sm">
        <CardHeader className="px-4 py-4">
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 pb-4">
          {[
            ["Total Items", "4"],
            ["Total Quantity", "170"],
            ["Total Amount", "Rs 9,975.00"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
          <Button className="h-12 w-full rounded-lg bg-blue-600 text-base hover:bg-blue-700">
            <Send className="size-4" />
            Issue Material
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}

function WorkflowStrip() {
  return (
    <div className="mt-6 grid gap-3 rounded-lg border bg-white p-4 shadow-sm lg:grid-cols-3">
      {[
        { icon: Barcode, title: "Scan Barcode", copy: "Use barcode scanner for faster entry" },
        { icon: Plus, title: "Quick Add", copy: "Search & add materials to cart quickly" },
        { icon: ScanLine, title: "Auto Split", copy: "System will auto split project & misc items" },
      ].map((item, index) => (
        <div key={item.title} className={cn("flex items-center gap-4 px-2", index > 0 && "lg:border-l lg:pl-8")}>
          <div className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700">
            <item.icon className="size-5" />
          </div>
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="mt-1 text-sm text-slate-500">{item.copy}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone: "blue" | "emerald"
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <div className={cn("grid size-10 place-items-center rounded-full", tone === "blue" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700")}>
        <Icon className="size-5" />
      </div>
      <div>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  )
}

function FieldLabel({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-600">
      <span>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {children}
    </label>
  )
}
