# Changelog

Tüm önemli değişiklikler bu dosyada belgelenecektir.

## [Unreleased]

## [v0.0.1-108] - 2024-01-28

### Eklenen
- Satır seçim sistemi eklendi
  - Tekli satır seçimi desteği
  - Seçim durumu state yönetimi (`_selectedRows`)
  - Seçili satırların verilerine erişim (`selectedRows`)
  - Dışarıdan satır seçimi kontrolü (`toggleRowSelection`)
  - Seçim durumu kontrolü (`isRowSelected`)

- Virtualization desteği
  - Büyük veri setleri için performans optimizasyonu
  - Orijinal indeks (oi) tabanlı veri yönetimi
  - Görünür satırların etkin yönetimi

- Erişilebilirlik (a11y) geliştirmeleri
  - ARIA öznitelikleri eklendi
  - Klavye navigasyonu desteği
  - Seçim kolonu için button elementi kullanımı

### Değiştirilen
- SelectionColumn bileşeni yeniden tasarlandı
  - Checkbox yerine özel tasarım
  - Erişilebilirlik iyileştirmeleri
  - Klavye etkileşimi desteği

### Optimize Edilen
- Satır seçim mantığı virtualization ile uyumlu hale getirildi
- İndeks dönüşümleri optimize edildi
- Gereksiz re-render'lar engellendi

### Düzeltilen
- Virtualization ile seçim sistemi arasındaki indeks uyumsuzlukları giderildi
- Seçim durumu state güncellemelerindeki sorunlar çözüldü
