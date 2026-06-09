"use client"

import * as React from "react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Material = {
  name: string
  code: string
  category: string
  unit: string
  rate: number
  stock: number
  projectItem: boolean
  icon: React.ComponentType<{ className?: string }>
  tone: string
}

type CartLine = {
  code: string
  qty: number
}

const materialFilters = ["All", "Steel", "Consumables", "Fasteners", "Tools", "Others"]

const materials: Material[] = [
  {
    name: "MS Plate 10mm",
    code: "ST-PL-001",
    category: "Steel",
    unit: "Kg",
    rate: 64.5,
    stock: 540,
    projectItem: true,
    icon: Layers3,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    name: "MS Angle 50x50x6mm",
    code: "ST-AN-002",
    category: "Steel",
    unit: "Kg",
    rate: 61.2,
    stock: 320,
    projectItem: true,
    icon: Gauge,
    tone: "bg-zinc-100 text-zinc-700",
  },
  {
    name: "Welding Rod E6013",
    code: "WR-001",
    category: "Consumables",
    unit: "Kg",
    rate: 118,
    stock: 125,
    projectItem: true,
    icon: Wrench,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    name: "Cutting Disc 4 inch",
    code: "CD-001",
    category: "Consumables",
    unit: "Pcs",
    rate: 17.5,
    stock: 210,
    projectItem: true,
    icon: ScanLine,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Gas Cylinder (Oxygen)",
    code: "GC-001",
    category: "Others",
    unit: "Nos",
    rate: 2320,
    stock: 16,
    projectItem: false,
    icon: ShieldCheck,
    tone: "bg-teal-100 text-teal-700",
  },
  {
    name: "Gloves",
    code: "GL-001",
    category: "Tools",
    unit: "Pair",
    rate: 32,
    stock: 260,
    projectItem: false,
    icon: HardHat,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    name: "Cleaning Cloth",
    code: "CC-001",
    category: "Consumables",
    unit: "Pcs",
    rate: 8,
    stock: 500,
    projectItem: false,
    icon: Package,
    tone: "bg-sky-100 text-sky-700",
  },
]

const initialCart: CartLine[] = [
  { code: "ST-PL-001", qty: 100 },
  { code: "WR-001", qty: 20 },
  { code: "CD-001", qty: 30 },
  { code: "GL-001", qty: 20 },
]

function money(value: number) {
  return `Rs ${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function amount(value: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function IssueMaterialPage() {
  const [query, setQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("All")
  const [cart, setCart] = React.useState<CartLine[]>(initialCart)
  const [project, setProject] = React.useState("P-1001 | Warehouse Structure")
  const [stage, setStage] = React.useState("Fabrication")
  const [issuedBy, setIssuedBy] = React.useState("Amit Sharma")
  const [issueDate, setIssueDate] = React.useState("20/05/2024")
  const [remarks, setRemarks] = React.useState("")
  const [message, setMessage] = React.useState("")

  const materialByCode = React.useMemo(
    () => new Map(materials.map((material) => [material.code, material])),
    []
  )

  const filteredMaterials = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return materials.filter((material) => {
      const matchesFilter =
        activeFilter === "All" || material.category === activeFilter
      const matchesQuery =
        !needle ||
        material.name.toLowerCase().includes(needle) ||
        material.code.toLowerCase().includes(needle) ||
        material.category.toLowerCase().includes(needle)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  const cartRows = cart
    .map((line) => {
      const material = materialByCode.get(line.code)
      return material ? { ...line, material } : null
    })
    .filter(Boolean) as Array<CartLine & { material: Material }>

  const totals = cartRows.reduce(
    (summary, row) => {
      const lineAmount = row.qty * row.material.rate
      summary.quantity += row.qty
      summary.amount += lineAmount
      if (row.material.projectItem) {
        summary.projectItems += 1
        summary.projectAmount += lineAmount
      } else {
        summary.miscItems += 1
        summary.miscAmount += lineAmount
      }
      return summary
    },
    {
      quantity: 0,
      amount: 0,
      projectItems: 0,
      projectAmount: 0,
      miscItems: 0,
      miscAmount: 0,
    }
  )

  function addMaterial(material: Material) {
    setMessage("")
    setCart((current) => {
      const existing = current.find((line) => line.code === material.code)
      if (existing) {
        return current.map((line) =>
          line.code === material.code
            ? { ...line, qty: Math.min(line.qty + 1, material.stock) }
            : line
        )
      }
      return [...current, { code: material.code, qty: 1 }]
    })
  }

  function updateQuantity(code: string, delta: number) {
    setMessage("")
    setCart((current) =>
      current.map((line) => {
        if (line.code !== code) return line
        const material = materialByCode.get(code)
        const max = material?.stock ?? 9999
        return { ...line, qty: Math.min(Math.max(line.qty + delta, 1), max) }
      })
    )
  }

  function removeLine(code: string) {
    setMessage("")
    setCart((current) => current.filter((line) => line.code !== code))
  }

  function clearCart() {
    setMessage("")
    setCart([])
  }

  function issueMaterial() {
    if (!cartRows.length) {
      setMessage("Add at least one material before issuing.")
      return
    }
    setMessage(`Issued ${cartRows.length} items to ${project}.`)
  }

  return (
    <div className="flex h-svh flex-col bg-slate-50 text-slate-950">
      <header className="shrink-0 border-b bg-white/95 backdrop-blur">
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
            <Button
              variant="outline"
              className="h-11 rounded-lg"
              onClick={() => setQuery("ST-PL-001")}
            >
              <Barcode className="size-4" />
              Scan Barcode
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-lg"
              onClick={() => setCart(initialCart)}
            >
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

      <main className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="grid min-h-0 flex-1 gap-4 2xl:grid-cols-[28rem_minmax(0,1fr)_20rem]">
          <MaterialSearch
            activeFilter={activeFilter}
            filteredMaterials={filteredMaterials}
            query={query}
            setActiveFilter={setActiveFilter}
            setQuery={setQuery}
            addMaterial={addMaterial}
          />
          <IssueCart
            cartRows={cartRows}
            clearCart={clearCart}
            removeLine={removeLine}
            totals={totals}
            updateQuantity={updateQuantity}
          />
          <IssueDetails
            issueDate={issueDate}
            issuedBy={issuedBy}
            message={message}
            project={project}
            remarks={remarks}
            stage={stage}
            totals={totals}
            setIssueDate={setIssueDate}
            setIssuedBy={setIssuedBy}
            setProject={setProject}
            setRemarks={setRemarks}
            setStage={setStage}
            issueMaterial={issueMaterial}
          />
        </div>
        <WorkflowStrip />
      </main>
    </div>
  )
}

function MaterialSearch({
  activeFilter,
  filteredMaterials,
  query,
  setActiveFilter,
  setQuery,
  addMaterial,
}: {
  activeFilter: string
  filteredMaterials: Material[]
  query: string
  setActiveFilter: (filter: string) => void
  setQuery: (query: string) => void
  addMaterial: (material: Material) => void
}) {
  return (
    <Card className="flex min-h-0 rounded-lg py-0 shadow-sm">
      <Tabs defaultValue="search">
        <CardHeader className="shrink-0 border-b p-0">
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
      <CardContent className="flex min-h-0 flex-1 flex-col space-y-4 p-4">
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search material name / scan barcode"
            className="h-11 rounded-lg pl-9 pr-10"
          />
          <ScanLine className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
        </div>
        <ScrollArea className="w-full shrink-0 pb-2">
          <div className="flex w-max gap-2">
            {materialFilters.map((filter) => (
              <Button
                key={filter}
                variant={filter === activeFilter ? "default" : "secondary"}
                size="sm"
                className={cn(
                  "h-9 rounded-lg px-4",
                  filter === activeFilter && "bg-blue-600 hover:bg-blue-700"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="min-h-0 flex-1 pr-3">
          <div className="space-y-0">
            {filteredMaterials.map((material) => (
              <div key={material.code} className="flex items-center gap-3 border-t py-4 first:border-t-0">
                <div className={cn("grid size-14 shrink-0 place-items-center rounded-lg", material.tone)}>
                  <material.icon className="size-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{material.name}</div>
                  <div className="mt-1 truncate text-xs text-slate-500">
                    {material.code} | {material.category}
                  </div>
                  <div className="mt-1 font-semibold">
                    {money(material.rate)} / {material.unit}
                  </div>
                </div>
                <div className="hidden text-xs md:block">
                  <Badge className="bg-emerald-100 text-emerald-700" variant="secondary">
                    In Stock
                  </Badge>
                  <div className="mt-2 text-slate-600">
                    Available: {material.stock} {material.unit}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-lg border-blue-200 text-blue-700"
                  onClick={() => addMaterial(material)}
                >
                  <Plus className="size-5" />
                </Button>
              </div>
            ))}
            {!filteredMaterials.length && (
              <div className="grid min-h-48 place-items-center text-sm text-slate-500">
                No materials match your search.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function IssueCart({
  cartRows,
  clearCart,
  removeLine,
  totals,
  updateQuantity,
}: {
  cartRows: Array<CartLine & { material: Material }>
  clearCart: () => void
  removeLine: (code: string) => void
  totals: {
    quantity: number
    amount: number
  }
  updateQuantity: (code: string, delta: number) => void
}) {
  return (
    <Card className="flex min-h-0 rounded-lg py-0 shadow-sm">
      <CardHeader className="shrink-0 flex-row items-center justify-between border-b px-5 py-4">
        <CardTitle className="text-lg">
          Issue Cart <span className="font-normal text-slate-500">({cartRows.length} Items)</span>
        </CardTitle>
        <Button
          variant="destructive"
          size="sm"
          className="bg-red-50 text-red-600 hover:bg-red-100"
          onClick={clearCart}
          disabled={!cartRows.length}
        >
          <Trash2 className="size-4" />
          Clear Cart
        </Button>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <ScrollArea className="min-h-0 flex-1">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-medium text-slate-600">
              <tr>
                {["#", "Material", "Unit", "Stock", "Qty", "Rate (Rs)", "Amount (Rs)", "Action"].map((head) => (
                  <th key={head} className="px-4 py-4 font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartRows.map((row, index) => (
                <tr key={row.code} className="border-t">
                  <td className="px-4 py-5">{index + 1}</td>
                  <td className="px-4 py-5">
                    <div className="font-semibold">{row.material.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{row.material.code}</div>
                  </td>
                  <td className="px-4 py-5">{row.material.unit}</td>
                  <td className="px-4 py-5">{row.material.stock}</td>
                  <td className="px-4 py-5">
                    <div className="inline-flex h-10 overflow-hidden rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-10 rounded-none"
                        onClick={() => updateQuantity(row.code, -1)}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <div className="grid w-14 place-items-center border-x bg-white">{row.qty}</div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-10 rounded-none"
                        onClick={() => updateQuantity(row.code, 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-5">{amount(row.material.rate)}</td>
                  <td className="px-4 py-5">{amount(row.qty * row.material.rate)}</td>
                  <td className="px-4 py-5">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => removeLine(row.code)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!cartRows.length && (
            <div className="grid min-h-72 place-items-center border-t text-sm text-slate-500">
              Add materials from the search panel to start an issue cart.
            </div>
          )}
        </ScrollArea>
        <div className="shrink-0 border-t p-5">
          <div className="mb-4 font-semibold">Cart Summary</div>
          <div className="grid gap-3 md:grid-cols-3">
            <SummaryCard icon={Users} label="Total Items" value={`${cartRows.length}`} tone="blue" />
            <SummaryCard icon={BookOpenCheck} label="Total Quantity" value={`${totals.quantity}`} tone="blue" />
            <SummaryCard icon={CircleDollarSign} label="Total Amount" value={money(totals.amount)} tone="emerald" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function IssueDetails({
  issueDate,
  issuedBy,
  message,
  project,
  remarks,
  stage,
  totals,
  setIssueDate,
  setIssuedBy,
  setProject,
  setRemarks,
  setStage,
  issueMaterial,
}: {
  issueDate: string
  issuedBy: string
  message: string
  project: string
  remarks: string
  stage: string
  totals: {
    amount: number
    miscAmount: number
    miscItems: number
    projectAmount: number
    projectItems: number
    quantity: number
  }
  setIssueDate: (value: string) => void
  setIssuedBy: (value: string) => void
  setProject: (value: string) => void
  setRemarks: (value: string) => void
  setStage: (value: string) => void
  issueMaterial: () => void
}) {
  return (
    <aside className="flex min-h-0 flex-col gap-3">
      <Card className="shrink-0 rounded-lg border-blue-200 py-0 shadow-sm">
        <CardHeader className="px-4 py-4">
          <CardTitle className="text-lg text-blue-950">Issue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 pb-4">
          <FieldLabel label="Project" required>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="h-11 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="P-1001 | Warehouse Structure">P-1001 | Warehouse Structure</SelectItem>
                <SelectItem value="P-1002 | Pipe Rack System">P-1002 | Pipe Rack System</SelectItem>
              </SelectContent>
            </Select>
          </FieldLabel>
          <div className="flex items-start gap-2 text-xs font-medium text-emerald-700">
            <PackageCheck className="mt-0.5 size-4" />
            Project-wise materials will be issued to this project.
          </div>
          <FieldLabel label="Work Stage (Optional)">
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger className="h-11 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fabrication">Fabrication</SelectItem>
                <SelectItem value="Erection">Erection</SelectItem>
                <SelectItem value="Finishing">Finishing</SelectItem>
              </SelectContent>
            </Select>
          </FieldLabel>
          <FieldLabel label="Issued By" required>
            <Select value={issuedBy} onValueChange={setIssuedBy}>
              <SelectTrigger className="h-11 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Amit Sharma">Amit Sharma</SelectItem>
                <SelectItem value="Store Team">Store Team</SelectItem>
              </SelectContent>
            </Select>
          </FieldLabel>
          <FieldLabel label="Issue Date" required>
            <div className="relative">
              <Input
                value={issueDate}
                onChange={(event) => setIssueDate(event.target.value)}
                className="h-11 rounded-lg pr-10"
              />
              <CalendarDays className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            </div>
          </FieldLabel>
          <FieldLabel label="Remarks (Optional)">
            <Textarea
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              placeholder="Enter remarks"
              className="min-h-20 rounded-lg"
            />
          </FieldLabel>
        </CardContent>
      </Card>

      <Card className="shrink-0 rounded-lg border-emerald-100 bg-emerald-50/50 py-0 shadow-sm">
        <CardHeader className="px-4 py-4">
          <CardTitle className="text-sm text-emerald-800">Issue Split (Auto)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 px-4 pb-4 sm:grid-cols-2 2xl:grid-cols-1 min-[1660px]:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="text-sm font-semibold text-emerald-800">Project-wise Items</div>
            <div className="mt-3 text-xs text-emerald-700">{totals.projectItems} Items</div>
            <div className="mt-3 text-xl font-semibold">{money(totals.projectAmount)}</div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="text-sm font-semibold text-amber-800">Misc Items</div>
            <div className="mt-3 text-xs text-amber-700">{totals.miscItems} Items</div>
            <div className="mt-3 text-xl font-semibold">{money(totals.miscAmount)}</div>
          </div>
          <p className="text-center text-xs text-slate-500 sm:col-span-2 2xl:col-span-1 min-[1660px]:col-span-2">
            Misc items will be recorded as expense.
          </p>
        </CardContent>
      </Card>

      <Card className="min-h-0 flex-1 rounded-lg py-0 shadow-sm">
        <CardHeader className="px-4 py-4">
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col space-y-4 px-4 pb-4">
          {[
            ["Total Items", `${totals.projectItems + totals.miscItems}`],
            ["Total Quantity", `${totals.quantity}`],
            ["Total Amount", money(totals.amount)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
          {message && (
            <div className={cn("rounded-lg border px-3 py-2 text-sm", message.startsWith("Issued") ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700")}>
              {message}
            </div>
          )}
          <Button
            className="mt-auto h-12 w-full rounded-lg bg-blue-600 text-base hover:bg-blue-700"
            onClick={issueMaterial}
          >
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
    <div className="shrink-0 grid gap-3 rounded-lg border bg-white p-4 shadow-sm lg:grid-cols-3">
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
