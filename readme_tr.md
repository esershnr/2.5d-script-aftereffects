[🇬🇧 Read in English](./readme.md)

# Nasıl Kullanacaksınız?

1. Ana 2D Logo katmanını seçin.
2. Scripti çalıştırın.
3. **Effect Controls** panelini kontrol edin.

İki tane ayar göreceksiniz:

- **3D Genişleme (0-100):** Animasyonun (Akordiyon gibi) ne kadar açılacağını belirler.
- **Gölge (Shading) Aç/Kapat:** Yanındaki kutucuğa tik atarsanız derinlik koyulaşır (Shaded), tiki kaldırırsanız flat/düz renk olur.

## Önemli Not (Performans İçin)

Eğer ana logoya **Glow, Drop Shadow, Bevel** gibi ağır efektler ekleyecekseniz, bunu scripti çalıştırmadan önce **YAPMAYIN**.

**Neden?** Çünkü script katmanı kopyalarken üzerindeki efektleri de kopyalar.

- 1 katmanda Glow = Hızlı Render.
- 50 katmanda Glow = Bilgisayarı kitleyebilir(Bilgisayarınızın gücüne bağlı).

### Doğru Akış:

1. Logonun 2D hali sahnedeyken ve seçiliyken scripti çalıştır.
2. İşlem bittikten sonra, ana logo dahil oluşan tüm katmanları seç.
3. Sağ tık -> **Pre-compose**.
4. Pre-comp'un üzerine istediğin Glow'u, efekti at.
