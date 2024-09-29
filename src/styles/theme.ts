import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#FACC15", // Ana buton rengi (sarı)
    colorFillContentHover: "#f5f5f5", // İçerik hover arka plan rengi
    colorFillAlter: "#f0f0f0", // Alternatif arka plan rengi
    colorFillContent: "#fafafa", // İçerik arka plan rengi
    colorBgContainerDisabled: "#e0e0e0", // Devre dışı bırakılan container arka planı
    colorBgTextHover: "#e6f7ff", // Metin hover arka plan rengi
    colorBgTextActive: "#bae7ff", // Metin aktif arka plan rengi
    colorTextBase: "#000000", // Ana metin rengi (siyah)
    colorTextLightSolid: "#ffffff", // Beyaz metin rengi (Primary Button text gibi)
    colorBorder: "#d9d9d9", // Input border rengi (hafif gri)
    colorTextPlaceholder: "#bfbfbf", // Placeholder metin rengi
    colorTextDisabled: "#d9d9d9", // Devre dışı metin rengi
    colorTextHeading: "#262626", // Başlık metin rengi
    colorTextSecondary: "#8c8c8c", // İkincil metin rengi
    borderRadius: 6, // Köşelerde yuvarlaklık
    fontSize: 14, // Varsayılan font boyutu
    fontSizeLG: 16, // Başlıklar için büyük font
    sizeSM: 8, // Küçük margin/padding
    sizeMD: 16, // Orta margin/padding
    sizeLG: 24, // Büyük margin/padding
  },
};
