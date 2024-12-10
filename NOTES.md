```bash
npm-check -u
```

SLC Data Table'ın `vertical virtual scroll`daki sırrı Svelte'in `each` bloklarıdır. Anahtar (key) kullanımı, her bir öğeyi benzersiz bir şekilde tanımlar ve Svelte'in listeyi daha verimli bir şekilde güncellemesine yardımcı olur. Örneğin, bir satır öğesi eklendiğinde veya çıkarıldığında, Svelte sadece değişen öğeleri günceller ve diğer öğeleri olduğu gibi bırakır. Bu, performansı artırır ve gereksiz DOM manipülasyonlarını önler. Eğer `each` kullanımında anahtar (key) kullanılmazsa, Svelte veri değiştiğinde listeyi farklılaştırmak için değişiklikleri sondaki öğelere ekleyerek veya sondaki öğelerden kaldırarak yapacaktır. Tabloda dikey scroll yapıldığında `$derived` olarak ayarlanmış olan `table.data` yeniden hesaplanacak, `table.data.originalRowIndex` değirini takip eden `each` bloğu sadece yeni gelen satırları dom'a ekleyecek ve çıkması gerekenleri çıkartacaktır.

Buraya kadar `vertical virtual scroll` için Svelte'ten destek aldım ve işin Javascript ve HTML kısmını tasarladım.

Sırada CSS ile ekran yerleşimlerini doğru bir şekilde ayarlamak kaldı. Bunun için klasik `<table>` etiketini kullanmak yerine. `display: grid;` ve `role="grid"` olarak ayarlanmış `<div>` kullandım. Bunun avantajı `role="grid"` olan tablo elementinde `grid-template-rows` stiliyle tüm satırları rezerve ettiktten sonra `role="gridcell"` olan hücre elementinde satır sıralarını `grid-row-start` stili ile aldım. Hücre elementine `grid-row-start` değerini, `role="row"` olan satır elementinden aldım. `grid-row-start` stili hücrenin rezerve edilmiş bölümde yerinin neresi olduğunu belirtir. Svelte her scroll'da veriyi güncellediğinde, görünür olan hücreler tablo alanı içinde tam da olması gereken yerde görünür olur.
