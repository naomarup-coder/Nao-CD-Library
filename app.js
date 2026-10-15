/* =========================================================
   118 CD Library - アプリの動作
   主な編集場所：
   1. 初期CDデータ       -> INITIAL_ALBUMS
   2. 一覧・詳細画面     -> renderHome / renderBook / renderAlbum
   3. 登録・編集         -> openAlbumForm / saveAlbumForm
   4. 保存・バックアップ -> loadAlbums / saveAlbums / exportBackup
   ========================================================= */

const STORAGE_KEY = "118_cd_library_v1";
const BOOKS = [
  { id: 1, name: "1冊目", description: "邦楽・ロック・アイドルなど" },
  { id: 2, name: "2冊目", description: "乃木坂46・アイドルなど" },
  { id: 3, name: "3冊目", description: "ジャズ・民族音楽・その他" },
];

/* 初期表示用のCD情報。必要に応じてここに追加できます。 */
const INITIAL_ALBUMS = [
  { book: 1, artist: "Mrs. GREEN APPLE", title: "Attitude", tracks: [{ disc: 1, songs: ["InsPirATioN", "Attitude", "インフェルノ", "CHEERS", "Viking", "ProPose", "僕のこと", "青と夏", "クダリ", "lovi'n", "Ke-Mo Sah-Bee", "ロマンチズム", "嘘じゃないよ", "How-to", "Soup", "Circle", "Folktale"] }], lyricsUrl: "https://drive.google.com/file/d/1OkHdEnsI1DtMxiYLoIPsWoGv7UJcoP1/view?usp=drive_link" },
  { book: 1, artist: "Mrs. GREEN APPLE", title: "5" },
  { book: 1, artist: "Mrs. GREEN APPLE", title: "10" },
  { book: 1, artist: "マカロニえんぴつ", title: "hope" },
  { book: 1, artist: "Vaundy", title: "strobo" },
  { book: 1, artist: "Vaundy", title: "replica", tracks: [
    { disc: 1, songs: ["Audio 007", "ZERO", "美電球", "カーニバル", "1リッター分の愛をこめて", "常熱", "Audio 006", "宮", "黒子", "逆光 - replica -", "NEO JAPAN", "呼吸のように", "怪獣の花唄 - replica -", "Audio 008", "replica"] },
    { disc: 2, songs: ["Audio 007", "ZERO", "美電球", "カーニバル", "1リッター分の愛をこめて", "常熱", "Audio 006", "宮", "黒子", "逆光 - replica -", "NEO JAPAN", "呼吸のように", "怪獣の花唄 - replica -", "Audio 008", "replica"] },
  ] },
  { book: 1, artist: "ちゃくら", title: "いびつな愛ですが" },
  { book: 1, artist: "ちゃくら", title: "GIRLS BAND NEVER DIE" },
  { book: 1, artist: "Wienners", title: "DIAMOND" },
  { book: 1, artist: "Wienners", title: "BURST POP ISLAND" },
  { book: 1, artist: "サカナクション", title: "834.194" },
  { book: 1, artist: "星野源", title: "POP VIRUS" },
  { book: 1, artist: "星野源", title: "YELLOW DANCER" },
  { book: 1, artist: "平沢進", title: "ホログラムを登る男" },
  { book: 1, artist: "P-MODEL", title: "ゴールデン☆ベスト" },
  { book: 1, artist: "YMO", title: "GO HOME!" },
  { book: 1, artist: "マキシマム ザ ホルモン", title: "ぶっ生き返す" },
  { book: 1, artist: "プリンセス プリンセス", title: "SINGLES 1987-1992" },
  { book: 1, artist: "嵐", title: "５×２０" },
  { book: 1, artist: "Appare!", title: "Appare!Future" },
  { book: 1, artist: "Appare!", title: "Appare!BonVoyage" },
  { book: 1, artist: "CANDY TUNE", title: "倍々FIGHT!" },
  { book: 1, artist: "FRUITS ZIPPER", title: "NEW KAWAII" },
  { book: 1, artist: "KAWAII LAB.", title: "BEST ALBUM" },

  { book: 2, artist: "乃木坂46", title: "今が思い出になるまで" },
  { book: 2, artist: "乃木坂46", title: "Time Flies" },
  { book: 2, artist: "乃木坂46", title: "僕だけの君" },
  { book: 2, artist: "乃木坂46", title: "Sing Out!" },
  { book: 2, artist: "乃木坂46", title: "夜明けまで強がらなくてもいい" },
  { book: 2, artist: "乃木坂46", title: "おひとりさま天国" },
  { book: 2, artist: "乃木坂46", title: "Monopoly" },
  { book: 2, artist: "乃木坂46", title: "チャンスは平等" },
  { book: 2, artist: "乃木坂46", title: "歩道橋" },
  { book: 2, artist: "乃木坂46", title: "ネーブルオレンジ" },
  { book: 2, artist: "乃木坂46", title: "Same numbers" },
  { book: 2, artist: "乃木坂46", title: "ビリヤニ" },
  { book: 2, artist: "CANDY TUNE", title: "キス・ミー・パティシエ" },
  { book: 2, artist: "CANDY TUNE", title: "推し♡好き♡しんどい" },
  { book: 2, artist: "Appare!", title: "僕らのワンダーランド" },
  { book: 2, artist: "Appare!", title: "Summer spit! / ゴールデンタイム" },
  { book: 2, artist: "Appare!", title: "大爆走！しゅばどかーん！" },

  { book: 3, artist: "NONESUCH", title: "バリのガムラン" },
  { book: 3, artist: "鼓童", title: "Tomorrow" },
  { book: 3, artist: "坂本龍一", title: "Playing the Orchestra 2013" },
  { book: 3, artist: "ANTONIO LOUREIRO", title: "So" },
  { book: 3, artist: "J.J. JOHNSON", title: "What's New" },
  { book: 3, artist: "DIZZY GILLESPIE", title: "AT NEWPORT" },
  { book: 3, artist: "Maria Schneider", title: "DATA LORDS" },
  { book: 3, artist: "Martha Kato", title: "Moonlit" },
  { book: 3, artist: "Jacob Collier", title: "The Light For Days" },
  { book: 3, artist: "M!LK", title: "LOVE ENG!NE" },
  { book: 3, artist: "BUDDiiS", title: "THIS IS BUDDiiS" },
  { book: 3, artist: "TWS", title: "はじめまして" },
  { book: 3, artist: "TWS", title: "Play hard" },
  { book: 3, artist: "TWS", title: "SODA SODA" },
].map((album, index) => ({
  id: `cd-${String(index + 1).padStart(4, "0")}`,
  tracks: [],
  lyrics: [],
  notes: "",
  cover: "",
  lyricsUrl: "",
  ...album,
}));

/* アプリの状態 */
let albums = loadAlbums();
let activeBookId = null;
let activeAlbumId = null;
let searchText = "";

const app = document.querySelector("#app");
const dialog = document.querySelector("#dialog");
const dialogContent = document.querySelector("#dialogContent");

/* ---------------------------------------------------------
   データ保存・共通関数
   --------------------------------------------------------- */
function loadAlbums() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.warn("保存データを読み込めませんでした。", error);
  }
  return structuredClone(INITIAL_ALBUMS);
}

function saveAlbums() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
    return true;
  } catch (error) {
    alert("ブラウザの保存容量が足りない可能性があります。画像を減らすか、JSONバックアップを保存してください。");
    console.error(error);
    return false;
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function getBookName(bookId) {
  return BOOKS.find((book) => book.id === Number(bookId))?.name ?? `${bookId}冊目`;
}

function getAlbum(albumId) {
  return albums.find((album) => album.id === albumId);
}

function countTracks(album) {
  return (album.tracks ?? []).reduce((total, disc) => total + (disc.songs ?? []).length, 0);
}

function matchesSearch(album) {
  const query = searchText.trim().toLocaleLowerCase();
  if (!query) return true;
  const searchableText = [
    album.artist,
    album.title,
    ...(album.tracks ?? []).flatMap((disc) => disc.songs ?? []),
  ].join(" ").toLocaleLowerCase();
  return searchableText.includes(query);
}

function showDialog(content) {
  dialogContent.innerHTML = content;
  if (!dialog.open) dialog.showModal();
}

function closeDialog() {
  if (dialog.open) dialog.close();
}

function breadcrumb(items) {
  return `<nav class="breadcrumb" aria-label="パンくずリスト">${items.map((item, index) => {
    if (item.action) return `<button type="button" data-action="${item.action}">${escapeHtml(item.label)}</button>${index < items.length - 1 ? " › " : ""}`;
    return `<span>${escapeHtml(item.label)}</span>${index < items.length - 1 ? " › " : ""}`;
  }).join("")}</nav>`;
}

function albumCard(album) {
  const cover = album.cover
    ? `<img src="${album.cover}" alt="${escapeHtml(album.title)}のジャケット">`
    : "💿";
  return `
    <article class="card album-card" tabindex="0" role="button" data-open-album="${escapeHtml(album.id)}" aria-label="${escapeHtml(album.artist)} ${escapeHtml(album.title)}の詳細">
      <div class="album-cover">${cover}</div>
      <div class="album-copy">
        <div class="album-artist">${escapeHtml(album.artist)}</div>
        <div class="album-title">${escapeHtml(album.title)}</div>
        <div class="album-meta">${countTracks(album)}曲 · 歌詞カード画像 ${album.lyrics?.length ?? 0}枚</div>
      </div>
    </article>`;
}

function searchToolbar() {
  return `
    <div class="toolbar">
      <input class="search-input" id="searchInput" type="search" placeholder="CD名・アーティスト名・曲名で検索" value="${escapeHtml(searchText)}" aria-label="CDを検索">
      <button class="button button-primary" type="button" data-action="add-album">＋ CDを登録</button>
      <button class="button" type="button" data-action="export">バックアップ</button>
      <button class="button" type="button" data-action="import">復元</button>
    </div>`;
}

/* ---------------------------------------------------------
   画面1：ホーム（冊の選択）
   --------------------------------------------------------- */
function renderHome() {
  activeBookId = null;
  activeAlbumId = null;
  const bookCards = BOOKS.map((book) => {
    const count = albums.filter((album) => album.book === book.id).length;
    return `
      <article class="card book-card" tabindex="0" role="button" data-open-book="${book.id}">
        <div class="book-icon">📚</div>
        <h2 class="card-title">${escapeHtml(book.name)}</h2>
        <div class="muted">${escapeHtml(book.description)}</div>
        <div class="album-meta">登録CD：${count}枚</div>
      </article>`;
  }).join("");

  const searchResults = searchText.trim()
    ? `<section><div class="section-heading"><div><h2>検索結果</h2><div class="muted">「${escapeHtml(searchText)}」</div></div></div><div class="card-grid">${albums.filter(matchesSearch).map(albumCard).join("") || '<p class="empty-state">該当するCDがありません。</p>'}</div></section>`
    : "";

  app.innerHTML = `
    ${searchToolbar()}
    <section>
      <div class="section-heading"><div><h1>CDライブラリ</h1><div class="muted">冊を選んで、CDの詳細・曲目・歌詞カードを確認できます。</div></div></div>
      <div class="card-grid">${bookCards}</div>
    </section>
    ${searchResults}
    <div class="notice">このバージョンはブラウザごとにデータを保存します。別の端末とデータを共有する場合は、後からクラウド保存の設定が必要です。</div>`;
}

/* ---------------------------------------------------------
   画面2：冊ごとのCD一覧
   --------------------------------------------------------- */
function renderBook(bookId) {
  activeBookId = Number(bookId);
  activeAlbumId = null;
  const bookAlbums = albums.filter((album) => album.book === activeBookId && matchesSearch(album));

  app.innerHTML = `
    ${breadcrumb([{ label: "ライブラリ", action: "home" }, { label: getBookName(activeBookId) }])}
    ${searchToolbar()}
    <section>
      <div class="section-heading"><div><h1>${escapeHtml(getBookName(activeBookId))}</h1><div class="muted">${bookAlbums.length}枚</div></div></div>
      <div class="card-grid">${bookAlbums.map(albumCard).join("") || '<p class="empty-state">該当するCDがありません。</p>'}</div>
    </section>`;
}

/* ---------------------------------------------------------
   画面3：アルバム詳細（アーティスト/タイトル > 曲目 > 歌詞カード）
   --------------------------------------------------------- */
function renderAlbum(albumId) {
  const album = getAlbum(albumId);
  if (!album) return renderHome();
  activeAlbumId = albumId;
  activeBookId = album.book;

  const cover = album.cover
    ? `<img src="${album.cover}" alt="${escapeHtml(album.title)}のジャケット">`
    : "💿";
  const trackMarkup = (album.tracks ?? []).length
    ? album.tracks.map((disc, discIndex) => `
        <h3 class="disc-heading">${escapeHtml(disc.label || `Disc ${disc.disc || discIndex + 1}`)}</h3>
        <ol class="track-list">${(disc.songs ?? []).map((song, index) => `
          <li><span class="track-number">${String(index + 1).padStart(2, "0")}</span><span>${escapeHtml(song)}</span></li>`).join("")}</ol>`).join("")
    : '<p class="empty-state">曲目はまだ登録されていません。「編集」から入力できます。</p>';

  const lyricImages = (album.lyrics ?? []).map((lyric, index) => `
    <div class="lyric-item">
      <img class="lyric-image" src="${lyric.data}" alt="${escapeHtml(lyric.name)}" data-zoom-image="${index}">
      <span class="lyric-name">${escapeHtml(lyric.name)}</span>
    </div>`).join("");

  const lyricLink = album.lyricsUrl
    ? `<p><a class="text-link" href="${escapeHtml(album.lyricsUrl)}" target="_blank" rel="noopener noreferrer">歌詞カードPDFなどを開く ↗</a></p>`
    : "";

  app.innerHTML = `
    ${breadcrumb([
      { label: "ライブラリ", action: "home" },
      { label: getBookName(album.book), action: "book" },
      { label: `${album.artist} / ${album.title}` },
    ])}
    <section class="card detail-card">
      <div class="detail-header">
        <div class="detail-cover">${cover}</div>
        <div>
          <div class="album-artist">${escapeHtml(album.artist)}</div>
          <h1>${escapeHtml(album.title)}</h1>
          <span class="pill">${escapeHtml(getBookName(album.book))}</span>
          <div class="muted">${countTracks(album)}曲 · 歌詞カード画像 ${album.lyrics?.length ?? 0}枚</div>
        </div>
      </div>
      <div class="button-row no-print">
        <button class="button button-primary" type="button" data-action="edit-album">編集</button>
        <button class="button" type="button" data-action="print">印刷</button>
        <button class="button button-danger" type="button" data-action="delete-album">削除</button>
      </div>
    </section>

    <section>
      <div class="section-heading"><div><h2>曲目</h2><div class="muted">Discごとの収録曲</div></div></div>
      <div class="card">${trackMarkup}</div>
    </section>

    <section>
      <div class="section-heading"><div><h2>歌詞カード</h2><div class="muted">画像をタップすると拡大表示します。</div></div><button class="button" type="button" data-action="edit-album">画像を追加</button></div>
      <div class="card">
        ${lyricImages ? `<div class="lyric-grid">${lyricImages}</div>` : '<p class="empty-state">歌詞カード画像はまだ登録されていません。</p>'}
        ${lyricLink}
      </div>
    </section>
    ${album.notes ? `<section><div class="section-heading"><h2>メモ</h2></div><div class="card">${escapeHtml(album.notes).replace(/\n/g, "<br>")}</div></section>` : ""}`;
}

function render() {
  if (activeAlbumId) return renderAlbum(activeAlbumId);
  if (activeBookId) return renderBook(activeBookId);
  renderHome();
}

/* ---------------------------------------------------------
   登録・編集フォーム
   --------------------------------------------------------- */
function openAlbumForm(albumId = null, suggestedBook = activeBookId || 1) {
  const album = albumId ? getAlbum(albumId) : null;
  const trackText = (album?.tracks ?? []).map((disc, index) => {
    const heading = disc.label || `Disc ${disc.disc || index + 1}`;
    return [heading, ...(disc.songs ?? [])].join("\n");
  }).join("\n\n");

  showDialog(`
    <div class="dialog-heading"><h2>${album ? "CD情報を編集" : "CDを登録"}</h2><button class="button" type="button" data-action="close-dialog">閉じる</button></div>
    <form id="albumForm">
      <div class="form-grid">
        <div class="form-field">
          <label for="albumBook">冊</label>
          <select id="albumBook" name="book">${BOOKS.map((book) => `<option value="${book.id}" ${(album?.book ?? suggestedBook) === book.id ? "selected" : ""}>${escapeHtml(book.name)}</option>`).join("")}</select>
        </div>
        <div class="form-field">
          <label for="albumArtist">アーティスト名 *</label>
          <input id="albumArtist" name="artist" required value="${escapeHtml(album?.artist ?? "")}">
        </div>
        <div class="form-field form-field-full">
          <label for="albumTitle">タイトル *</label>
          <input id="albumTitle" name="title" required value="${escapeHtml(album?.title ?? "")}">
        </div>
        <div class="form-field form-field-full">
          <label for="albumTracks">曲目</label>
          <textarea id="albumTracks" name="tracks" placeholder="Disc 1\n曲名1\n曲名2\n\nDisc 2\n曲名1">${escapeHtml(trackText)}</textarea>
          <span class="help-text">1行につき1曲入力します。「Disc 1」「Disc 2」の見出しでディスクを分けられます。見出しを省略するとDisc 1になります。</span>
        </div>
        <div class="form-field form-field-full">
          <label for="albumLyrics">歌詞カード画像（複数選択可）</label>
          <input id="albumLyrics" name="lyricsFiles" type="file" accept="image/*" multiple>
          <span class="help-text">画像は自動的に縮小して、このブラウザに保存します。既存の画像を削除する操作は、詳細画面の画像管理機能として今後追加できます。</span>
        </div>
        <div class="form-field form-field-full">
          <label for="albumLyricsUrl">歌詞カードPDFなどのURL</label>
          <input id="albumLyricsUrl" name="lyricsUrl" type="url" placeholder="https://..." value="${escapeHtml(album?.lyricsUrl ?? "")}">
        </div>
        <div class="form-field form-field-full">
          <label for="albumNotes">メモ</label>
          <textarea id="albumNotes" name="notes" placeholder="初回盤、購入日など">${escapeHtml(album?.notes ?? "")}</textarea>
        </div>
      </div>
      <div class="button-row"><button class="button button-primary" type="submit">保存</button><button class="button" type="button" data-action="close-dialog">キャンセル</button></div>
    </form>`);

  document.querySelector("#albumForm").addEventListener("submit", (event) => saveAlbumForm(event, albumId));
}

function parseTrackText(text) {
  const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const discs = [];

  for (const [index, block] of blocks.entries()) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    let label = `Disc ${index + 1}`;
    if (/^(disc\s*\d+|ディスク\s*\d+)/i.test(lines[0] ?? "")) label = lines.shift();
    const songs = lines.map((line) => line.replace(/^\d+[._．、\s]+/, ""));
    if (songs.length) discs.push({ disc: index + 1, label, songs });
  }
  return discs;
}

async function saveAlbumForm(event, albumId) {
  event.preventDefault();
  const form = event.currentTarget;
  const oldAlbum = albumId ? getAlbum(albumId) : null;
  const imageFiles = [...form.elements.lyricsFiles.files];
  const newImages = [];

  for (const file of imageFiles) {
    if (!file.type.startsWith("image/")) continue;
    try {
      newImages.push({ name: file.name, data: await resizeImage(file) });
    } catch (error) {
      alert(`画像を読み込めませんでした：${file.name}`);
    }
  }

  const updatedAlbum = {
    id: oldAlbum?.id ?? `cd-${Date.now()}`,
    book: Number(form.elements.book.value),
    artist: form.elements.artist.value.trim(),
    title: form.elements.title.value.trim(),
    tracks: parseTrackText(form.elements.tracks.value),
    lyrics: [...(oldAlbum?.lyrics ?? []), ...newImages],
    lyricsUrl: form.elements.lyricsUrl.value.trim(),
    notes: form.elements.notes.value.trim(),
    cover: oldAlbum?.cover ?? "",
  };

  if (oldAlbum) albums = albums.map((item) => item.id === oldAlbum.id ? updatedAlbum : item);
  else albums.unshift(updatedAlbum);

  if (saveAlbums()) {
    closeDialog();
    activeBookId = updatedAlbum.book;
    activeAlbumId = updatedAlbum.id;
    renderAlbum(updatedAlbum.id);
  }
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maxDimension = 1400;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------------------------------------------------------
   QRコード・画像拡大・削除・バックアップ
   --------------------------------------------------------- */
function openLibraryQr() {
  const siteUrl = window.location.href.split("#")[0];
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(siteUrl)}`;
  showDialog(`
    <div class="dialog-heading"><h2>ライブラリ全体のQRコード</h2><button class="button" type="button" data-action="close-dialog">閉じる</button></div>
    <div class="qr-panel">
      <p>スマホのカメラで読み取ると、このページを開きます。</p>
      <img class="qr-image" src="${qrUrl}" alt="CDライブラリのQRコード">
      <p class="muted">${escapeHtml(siteUrl)}</p>
      <div class="notice">QRコードは公開URLでこのページを開いてから作成してください。パソコン内のファイルを開いた状態では、スマホからアクセスできません。</div>
      <div class="button-row" style="justify-content:center"><button class="button button-primary" type="button" data-action="print-qr">QRコードを印刷</button></div>
    </div>`);
}

function openZoomedImage(imageIndex) {
  const album = getAlbum(activeAlbumId);
  const image = album?.lyrics?.[imageIndex];
  if (!image) return;
  showDialog(`<div class="dialog-heading"><h2>${escapeHtml(image.name)}</h2><button class="button" type="button" data-action="close-dialog">閉じる</button></div><img class="zoomed-image" src="${image.data}" alt="${escapeHtml(image.name)}">`);
}

function deleteCurrentAlbum() {
  const album = getAlbum(activeAlbumId);
  if (!album) return;
  if (!confirm(`「${album.artist} / ${album.title}」を削除しますか？`)) return;
  albums = albums.filter((item) => item.id !== album.id);
  saveAlbums();
  activeAlbumId = null;
  renderBook(album.book);
}

function exportBackup() {
  const backup = new Blob([JSON.stringify(albums, null, 2)], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(backup);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "118-cd-library-backup.json";
  link.click();
  URL.revokeObjectURL(downloadUrl);
}

function importBackup() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const restoredAlbums = JSON.parse(reader.result);
        if (!Array.isArray(restoredAlbums)) throw new Error("JSON形式が違います");
        if (!confirm("現在のCDデータをバックアップの内容で置き換えますか？")) return;
        albums = restoredAlbums;
        if (saveAlbums()) renderHome();
      } catch (error) {
        alert("バックアップを読み込めませんでした。正しいJSONファイルか確認してください。");
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

/* ---------------------------------------------------------
   クリック・キーボード操作
   --------------------------------------------------------- */
document.addEventListener("click", (event) => {
  const albumCardElement = event.target.closest("[data-open-album]");
  if (albumCardElement) return renderAlbum(albumCardElement.dataset.openAlbum);

  const bookCardElement = event.target.closest("[data-open-book]");
  if (bookCardElement) return renderBook(Number(bookCardElement.dataset.openBook));

  const zoomImage = event.target.closest("[data-zoom-image]");
  if (zoomImage) return openZoomedImage(Number(zoomImage.dataset.zoomImage));

  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;

  switch (actionElement.dataset.action) {
    case "home": renderHome(); break;
    case "book": renderBook(activeBookId); break;
    case "add-album": openAlbumForm(null, activeBookId || 1); break;
    case "edit-album": openAlbumForm(activeAlbumId); break;
    case "delete-album": deleteCurrentAlbum(); break;
    case "export": exportBackup(); break;
    case "import": importBackup(); break;
    case "close-dialog": closeDialog(); break;
    case "print": window.print(); break;
    case "print-qr": window.print(); break;
  }
});

document.addEventListener("keydown", (event) => {
  const albumCardElement = event.target.closest?.("[data-open-album]");
  const bookCardElement = event.target.closest?.("[data-open-book]");
  if (event.key !== "Enter" && event.key !== " ") return;
  if (albumCardElement) { event.preventDefault(); renderAlbum(albumCardElement.dataset.openAlbum); }
  if (bookCardElement) { event.preventDefault(); renderBook(Number(bookCardElement.dataset.openBook)); }
});

document.addEventListener("input", (event) => {
  if (event.target.id !== "searchInput") return;
  const cursorPosition = event.target.selectionStart;
  searchText = event.target.value;
  if (activeBookId) renderBook(activeBookId);
  else renderHome();
  const newSearch = document.querySelector("#searchInput");
  newSearch?.focus();
  newSearch?.setSelectionRange(cursorPosition, cursorPosition);
});

document.querySelector("#homeButton").addEventListener("click", renderHome);
document.querySelector("#qrButton").addEventListener("click", openLibraryQr);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

/* 最初の画面を表示 */
renderHome();
