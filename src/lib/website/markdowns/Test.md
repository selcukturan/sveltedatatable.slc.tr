---
title: 'My First Post'
date: '2023-10-01'
---

# { title }

[An Internal Link](/)

# Başlık 1

## Başlık 2

### Başlık 3

#### Başlık 4

##### Başlık 5

###### Başlık 6

---

**Kalın metin**

_İtalik metin_

~~Üstü çizili metin~~

---

> Bu bir blok alıntıdır.
>
> İkinci satır.

---

- Liste öğesi 1
- Liste öğesi 2
  1. Alt liste öğesi 1
  2. Alt liste öğesi 2

1. Numaralı liste öğesi 1
2. Numaralı liste öğesi 2
   - Alt numaralı liste öğesi 1
   - Alt numaralı liste öğesi 2

---

1. First Item
   - Subitem A
   - Subitem B
     1. Sub-subitem I
     2. Sub-subitem II
   - Subitem C

---

Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | selçuk |
| col 2 is      |   centered    |        |
| zebra stripes |   are neat    |        |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

---

`inline code`

```javascript
// Bu bir kod bloğudur
<script>
  import Prism from 'prismjs';
  let code = 'console.log("Hello world");';
</script>

<Main>
	<MainContent>
		<p>introduction</p>
		<a href="/docs/installation">installation</a>
		<a href="/">home</a>
		<div class="slc-markdown">
			<Test />
			<Test />
			<Test />
		</div>
    <div>
			{@html Prism.highlight(code, Prism.languages.javascript)}
		</div>
	</MainContent>
	{#snippet sidebarRight()}
		<SidebarRight />
	{/snippet}
</Main>
```
