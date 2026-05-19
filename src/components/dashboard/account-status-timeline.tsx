"use client";

import { Check } from "lucide-react";

export type AccountStatus =
  | "pending"
  | "approved"
  | "validation_pending"
  | "completed";

export const ACCOUNT_STATUS_STEPS: {
  value: AccountStatus;
  label: string;
  color: string;
  ring: string;
  text: string;
}[] = [
  {
    value: "pending",
    label: "Pendiente",
    color: "bg-yellow-400",
    ring: "ring-yellow-300",
    text: "text-yellow-700",
  },
  {
    value: "approved",
    label: "Aprobada",
    color: "bg-amber-400",
    ring: "ring-amber-300",
    text: "text-amber-700",
  },
  {
    value: "validation_pending",
    label: "Validación Pendiente",
    color: "bg-lime-500",
    ring: "ring-lime-300",
    text: "text-lime-700",
  },
  {
    value: "completed",
    label: "Completada",
    color: "bg-green-600",
    ring: "ring-green-400",
    text: "text-green-700",
  },
];

function getStatusIndex(status: AccountStatus | null | undefined): number {
  if (!status) return 2;
  const idx = ACCOUNT_STATUS_STEPS.findIndex((s) => s.value === status);
  return idx === -1 ? 2 : idx;
}

export function AccountStatusTimeline({
  status,
}: {
  status?: AccountStatus | string | null;
}) {
  const activeIndex = getStatusIndex(status as AccountStatus);
  const totalSteps = ACCOUNT_STATUS_STEPS.length;
  const fillPercent = (activeIndex / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative px-2 pt-2 pb-1">
        {/* Track */}
        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${fillPercent}%`,
              background:
                "linear-gradient(90deg, #facc15 0%, #fbbf24 35%, #84cc16 70%, #16a34a 100%)",
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex items-center justify-between">
          {ACCOUNT_STATUS_STEPS.map((step, idx) => {
            const reached = idx <= activeIndex;
            return (
              <div
                key={step.value}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div
                  className={[
                    "z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300",
                    reached
                      ? `${step.color} border-white shadow-md ring-2 ${step.ring}`
                      : "bg-muted border-muted-foreground/20",
                  ].join(" ")}
                >
                  {reached ? (
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  )}
                </div>
                <span
                  className={[
                    "text-[10px] sm:text-xs font-medium text-center leading-tight max-w-[80px]",
                    reached ? step.text : "text-muted-foreground",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
