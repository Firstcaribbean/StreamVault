import { Facebook, Instagram, Laptop, MonitorPlay, PlayCircle, Smartphone, Tablet, Tv, Twitter } from "lucide-react";

const quickLinks = ["About", "DMCA", "Privacy", "Terms", "Contact"];
const devices = [
  { label: "Mobile", Icon: Smartphone },
  { label: "Tablet", Icon: Tablet },
  { label: "TV", Icon: Tv },
  { label: "Desktop", Icon: Laptop },
];
const socials = [
  { label: "Twitter", Icon: Twitter },
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/45 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-[1.1fr_.9fr_.9fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-vault/40 bg-vault/20 text-vault-light shadow-glow">
              <PlayCircle className="h-6 w-6 fill-vault/20" />
            </span>
            <span className="font-heading text-3xl text-white">StreamVault</span>
          </div>
          <p className="mt-3 max-w-sm text-white/62">The world's content. Always free.</p>
          <p className="mt-5 max-w-xl text-xs leading-5 text-white/42">
            StreamVault does not host any content. All titles are aggregated from publicly available free sources.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white">Quick links</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <a key={link} href="#home" className="rounded-md py-1.5 text-white/58 transition hover:text-molten focus-visible:focus-ring">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-white">
            <MonitorPlay className="h-4 w-4 text-vault-light" />
            Available on all devices
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {devices.map(({ label, Icon }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/70">
                <Icon className="h-4 w-4 text-molten" />
                {label}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#home"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition hover:-translate-y-0.5 hover:border-vault/50 hover:text-white focus-visible:focus-ring"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
