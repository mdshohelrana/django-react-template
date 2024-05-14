export type SolarReportItemProps = {
  icon: any;
  label: string;
  value: number | string | undefined;
  color: string;
};

export type SolarProduction = {
  startTime: string;
  value: string;
};

export type SolarPrice = {
  timeDuration: string;
  dk1Eur: number;
  dk2Eur: number;
  fiEur: number;
  no1Eur: number;
};

export type SolarPriceDTO = {
  time_duration: string;
  dk1_eur: number;
  dk2_eur: number;
  fi_eur: number;
  no1_eur: number;
};
