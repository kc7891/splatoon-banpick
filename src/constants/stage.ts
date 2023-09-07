type StageShape = {
  name: string;
  path: string;
};

export const STAGE = {
  yunohana: { name: "ユノハナ大渓谷", path: "/stage/S3_yunohana.png" },
  gonzui: { name: "ゴンズイ地区", path: "/stage/S3_gonzui.png" },
  yagara: { name: "ヤガラ市場", path: "/stage/S3_yagara.png" },
  mategai: { name: "マテガイ放水路", path: "/stage/S3_mategai.png" },
  namerou: { name: "ナメロウ金属", path: "/stage/S3_namerou.png" },
  masaba: { name: "マサバ海峡大橋", path: "/stage/S3_masaba.png" },
  kinmedai: { name: "キンメダイ美術館", path: "/stage/S3_kinmedai.png" },
  mahimahi: { name: "マヒマヒリゾート＆スパ", path: "/stage/S3_mahimahi.png" },
  amabi: { name: "海女美術大学", path: "/stage/S3_amabi.png" },
  chozame: { name: "チョウザメ造船", path: "/stage/S3_chozame.png" },
  zato: { name: "ザトウマーケット", path: "/stage/S3_zato.png" },
  sumeshi: { name: "スメーシーワールド", path: "/stage/S3_sumeshi.png" },
  kusaya: { name: "クサヤ温泉", path: "/stage/S3_kusaya.png" },
  hirame: { name: "ヒラメが丘団地", path: "/stage/S3_hirame.png" },
  nampura: { name: "ナンプラー遺跡", path: "/stage/S3_nampura.png" },
  mantamaria: { name: "マンタマリア号", path: "/stage/S3_mantamaria.png" },
  taraport: {
    name: "タラポートショッピングパーク",
    path: "/stage/S3_taraport.png",
  },
  comb: { name: "コンブトラック", path: "/stage/S3_comb.png" },
  takaashi: { name: "タカアシ経済特区", path: "/stage/S3_takaashi.png" },
  ohyo: { name: "オヒョウ海運", path: "/stage/S3_ohyo.png" },
} as const;

export type StageKey = keyof typeof STAGE;
