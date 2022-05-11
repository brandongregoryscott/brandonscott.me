import { Analytics } from "@segment/analytics-next";
import { atom, PrimitiveAtom } from "jotai";

const AnalyticsAtom = atom(undefined) as PrimitiveAtom<Analytics>;

export { AnalyticsAtom };
