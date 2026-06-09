import Link from "next/link"
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Factory,
  HardHat,
  LockKeyhole,
  Mail,
  PackageCheck,
  ShieldCheck,
} from "lucide-react"

export default function LoginPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#eef3f8_100%)] px-4 py-6 text-slate-950 sm:px-6 sm:py-10">
      <section className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-7xl items-center justify-center sm:min-h-[calc(100svh-5rem)]">
        <div className="relative w-full overflow-hidden rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.42)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] [mask-image:linear-gradient(180deg,black,transparent_92%)] bg-[size:48px_48px] opacity-60" />
          <div className="pointer-events-none absolute top-6 -left-12 size-52 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 size-64 rounded-full bg-emerald-400/18 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <BrandPanel />
            <LoginPanel />
          </div>
        </div>
      </section>
    </main>
  )
}

function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden rounded-[24px] bg-[#071521] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-8 lg:block lg:p-10">
      <div className="absolute top-16 -left-16 size-56 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-0 bottom-0 size-56 rounded-full bg-emerald-400/16 blur-3xl" />

      <div className="relative flex min-h-[34rem] flex-col">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <Building2 className="size-7 text-sky-200" />
          </div>
          <div>
            <div className="text-xl font-semibold tracking-wide">FAB SHOP</div>
            <div className="text-sm text-slate-300">Project OS</div>
          </div>
        </div>

        <div className="my-auto flex flex-col items-center py-10 text-center">
          <div className="relative grid size-72 place-items-center rounded-full border border-white/15 bg-white/8 shadow-[0_30px_90px_-46px_rgba(255,255,255,0.7)] backdrop-blur-sm sm:size-80">
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full border border-white/10" />
            <div className="grid size-32 place-items-center rounded-[28px] bg-white text-[#071521] shadow-2xl">
              <Factory className="size-16" />
            </div>
          </div>

          <div className="mt-8 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-slate-200 uppercase ring-1 ring-white/15">
              <ShieldCheck className="size-4 text-emerald-300" />
              Secure Workspace
            </div>
            <h1 className="mt-6 text-3xl leading-tight font-semibold tracking-normal sm:text-4xl">
              Fabrication projects, costs, labor, and delivery notes in one
              operating system.
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "12", label: "Active Projects", icon: PackageCheck },
            { value: "Rs 18.7L", label: "Month Cost", icon: CircleDollarSign },
            { value: "8", label: "Labor Teams", icon: HardHat },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/10 p-4"
            >
              <item.icon className="mb-3 size-5 text-sky-200" />
              <div className="text-2xl font-semibold">{item.value}</div>
              <div className="mt-1 text-xs text-slate-300">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LoginPanel() {
  return (
    <div className="flex items-center rounded-[24px] border border-slate-100 bg-white/92 p-6 shadow-inner sm:p-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#071521] text-white shadow-sm">
            <Building2 className="size-7 text-sky-200" />
          </div>
          <div>
            <div className="text-xl font-semibold tracking-wide">FAB SHOP</div>
            <div className="text-sm text-slate-500">Project OS</div>
          </div>
        </div>

        <span className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold tracking-[0.3em] text-slate-500 uppercase shadow-sm">
          Account Login
        </span>
        <h2 className="mt-6 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
          Sign in to continue.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Use your FAB SHOP workspace account to access project tracking,
          material records, labor entries, and delivery documents.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50/80 px-4 py-4 transition focus-within:border-blue-400 focus-within:bg-white">
              <Mail className="size-5 text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue="admin@fabshop.local"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <button
                type="button"
                className="text-sm font-medium text-[#071521] transition hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50/80 px-4 py-4 transition focus-within:border-blue-400 focus-within:bg-white">
              <LockKeyhole className="size-5 text-slate-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                defaultValue="password"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              defaultChecked
              className="size-4 rounded border-slate-300 accent-blue-600"
            />
            Remember this device
          </label>

          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563eb,#10b981)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(37,99,235,0.72)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-18px_rgba(16,185,129,0.62)]"
          >
            Sign in
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </form>

        <div className="mt-8 rounded-[24px] bg-slate-50 p-5 text-sm leading-6 text-slate-600">
          Access is currently invite-only for project admins, store teams, and
          fabrication supervisors.
        </div>
      </div>
    </div>
  )
}
//1
