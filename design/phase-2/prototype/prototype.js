(() => {
  "use strict";

  const data = window.VTTKD_DEMO;
  const root = document.querySelector("#prototype-root");
  const frame = document.querySelector("#prototype-frame");
  const statusRegion = document.querySelector("#prototype-status");
  const screenSelect = document.querySelector("#screen-select");
  const languageSelect = document.querySelector("#language-select");
  const viewportSelect = document.querySelector("#viewport-select");
  const stateSelect = document.querySelector("#state-select");
  const annotationToggle = document.querySelector("#annotation-toggle");
  const mediaDialog = document.querySelector("#media-dialog");
  let lastDialogTrigger = null;
  const initialResults = JSON.parse(JSON.stringify(data.results));

  function blankResult() {
    return {
      competitionId: "demo-competition-horizon",
      competitionFr: "Tournoi Démonstration Horizon",
      competitionEn: "Horizon Demonstration Tournament",
      date: "2026-11-07",
      placeFr: "Lieu fictif",
      placeEn: "Fictional venue",
      discipline: "kyorugi",
      participantType: "individual",
      athlete: "demo-athlete-a",
      teamNameFr: "",
      teamNameEn: "",
      categoryFr: "Catégorie fictive",
      categoryEn: "Fictional category",
      rank: "1",
      medal: "gold",
      commentFr: "Commentaire fictif.",
      commentEn: "Fictional comment.",
      source: "demo://justificatif-nouveau",
      status: "draft",
    };
  }

  const state = {
    screen: "home",
    language: "fr",
    viewport: "fluid",
    viewState: "default",
    annotations: false,
    results: initialResults,
    resultDraft: blankResult(),
    resultErrors: {},
    selectedResultId: "demo-result-001",
    editOriginal: null,
    resultNotice: "",
    contactValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
      privacy: false,
    },
  };

  const labels = {
    fr: {
      fictitious: "Exemple fictif",
      provisional: "Proposition provisoire",
      combat: "Kyorugi",
      poomsae: "Poomsae",
      gold: "Or",
      silver: "Argent",
      bronze: "Bronze",
      none: "Aucune médaille",
      rank: "Classement",
      athlete: "Athlète",
      competition: "Compétition",
      discipline: "Discipline",
      category: "Catégorie",
      datePlace: "Date et lieu",
      date: "Date",
      place: "Lieu",
      all: "Tous",
      reset: "Réinitialiser",
      filters: "Filtres",
      upcoming: "À venir",
      past: "Passé",
      formDemo: "Ce formulaire de démonstration ne transmet aucune donnée.",
      adminDemo:
        "Maquette fonctionnelle uniquement — aucune authentification ou publication réelle.",
    },
    en: {
      fictitious: "Fictional example",
      provisional: "Provisional proposal",
      combat: "Kyorugi",
      poomsae: "Poomsae",
      gold: "Gold",
      silver: "Silver",
      bronze: "Bronze",
      none: "No medal",
      rank: "Rank",
      athlete: "Athlete",
      competition: "Competition",
      discipline: "Discipline",
      category: "Category",
      datePlace: "Date and place",
      date: "Date",
      place: "Place",
      all: "All",
      reset: "Reset",
      filters: "Filters",
      upcoming: "Upcoming",
      past: "Past",
      formDemo: "This demonstration form does not transmit any data.",
      adminDemo:
        "Functional mockup only — no real authentication or publishing.",
    },
  };

  const copy = {
    fr: {
      homeTitle: "La maîtrise se construit en mouvement.",
      homeLead:
        "Une plateforme sportive pensée pour suivre le club, ses disciplines et ses performances.",
      nextEvent: "Prochaine échéance fictive",
      nextEventText: "Stage technique de démonstration — 21 novembre 2026",
      clubTitle: "Une identité collective, une ambition sportive.",
      clubLead:
        "Cette page validera la hiérarchie de l’histoire, des valeurs et de l’encadrement lorsque les textes officiels seront fournis.",
      disciplinesTitle: "Deux disciplines, une même exigence.",
      disciplinesLead:
        "Le Kyorugi est mis en avant ; le Poomsae conserve une présentation complète et identifiable.",
      athletesTitle: "Athlètes et parcours publics",
      athletesLead:
        "Les profils ne seront affichés qu’après validation des données et des autorisations.",
      athleteTitle: "Athlète Démo A",
      resultsTitle: "Résultats",
      honoursTitle: "Palmarès",
      resultsLead:
        "Filtrer les performances publiées sans perdre d’information sur mobile.",
      competitionTitle: "Tournoi Démonstration Horizon",
      calendarTitle: "Calendrier",
      newsTitle: "Actualités",
      mediaTitle: "Photos et vidéos",
      contactTitle: "Contacter le club",
      clubBody:
        "Texte fictif de mise en page. Le futur contenu présentera l’histoire vérifiée, la philosophie sportive et l’organisation du club sans inventer de faits.",
      coachTitle: "Équipe encadrante",
      coachBody:
        "Les fonctions, diplômes et biographies seront ajoutés uniquement à partir de sources approuvées.",
      combatBody:
        "Le Kyorugi, discipline principale du club, met en scène l’intensité, la stratégie et la progression sportive. Le contenu propre au club reste à fournir.",
      poomsaeBody:
        "Le Poomsae valorise la précision, la maîtrise technique et l’expression. Sa place est pleinement intégrée au site.",
      profileBody:
        "Biographie fictive utilisée uniquement pour valider la longueur de ligne, les relations et l’affichage responsive.",
      adminTitle: "Administration — maquette",
    },
    en: {
      homeTitle: "Mastery is built through movement.",
      homeLead:
        "A sports platform designed to follow the club, its disciplines and its performances.",
      nextEvent: "Next fictional milestone",
      nextEventText: "Demonstration technical workshop — 21 November 2026",
      clubTitle: "A collective identity, a sporting ambition.",
      clubLead:
        "This page validates the hierarchy for history, values and coaching information once approved copy is provided.",
      disciplinesTitle: "Two disciplines, one standard.",
      disciplinesLead:
        "Kyorugi is featured first; Poomsae keeps a complete and identifiable presentation.",
      athletesTitle: "Athletes and public journeys",
      athletesLead:
        "Profiles will only appear after data and publishing permissions are approved.",
      athleteTitle: "Demo Athlete A",
      resultsTitle: "Results",
      honoursTitle: "Honours",
      resultsLead:
        "Filter published performances without losing information on mobile.",
      competitionTitle: "Horizon Demonstration Tournament",
      calendarTitle: "Calendar",
      newsTitle: "News",
      mediaTitle: "Photos and videos",
      contactTitle: "Contact the club",
      clubBody:
        "Fictional layout copy. Future content will present verified history, sporting philosophy and organisation without inventing facts.",
      coachTitle: "Coaching team",
      coachBody:
        "Roles, qualifications and biographies will only be added from approved sources.",
      combatBody:
        "Kyorugi, the club’s primary discipline, conveys intensity, strategy and sporting progress. Club-specific copy remains to be provided.",
      poomsaeBody:
        "Poomsae highlights precision, technical mastery and expression. It is fully integrated throughout the site.",
      profileBody:
        "Fictional biography used solely to validate line length, relationships and responsive presentation.",
      adminTitle: "Administration — mockup",
    },
  };

  function ui() {
    return data.ui[state.language];
  }

  function text() {
    return copy[state.language];
  }

  function local(value) {
    return typeof value === "object" ? value[state.language] : value;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function a11y(fr, en) {
    return state.language === "fr" ? fr : en;
  }

  function disciplineName(value) {
    return value === "combat" || value === "kyorugi"
      ? "Kyorugi"
      : labels[state.language].poomsae;
  }

  function medalName(value) {
    return labels[state.language][value] || value;
  }

  function athleteFor(id) {
    return data.athletes.find((athlete) => athlete.id === id);
  }

  function publishedResults() {
    return state.results.filter((result) => result.status === "published");
  }

  function resultParticipant(result) {
    if (isNamedGroup(result)) {
      return local(result.teamName) || a11y("Équipe ou paire fictive", "Fictional team or pair");
    }
    return local(athleteFor(result.athlete)?.name || {
      fr: "Athlète fictif",
      en: "Fictional athlete",
    });
  }

  function displayDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value;
    const [year, month, day] = value.split("-");
    return state.language === "fr"
      ? `${day}.${month}.${year}`
      : `${day}/${month}/${year}`;
  }

  function isNamedGroup(result) {
    return result.participantType === "team" || result.participantType === "pair";
  }

  function honourBreakdown() {
    const published = publishedResults();
    const ofDiscipline = (discipline) =>
      published.filter(
        (item) => item.discipline === discipline || (discipline === "kyorugi" && item.discipline === "combat"),
      );
    const medalsOf = (list) => list.filter((item) => item.medal !== "none");
    const metal = (list, value) => list.filter((item) => item.medal === value).length;
    const kyorugi = ofDiscipline("kyorugi");
    const poomsae = ofDiscipline("poomsae");
    return {
      participations: published.length,
      medals: medalsOf(published).length,
      gold: metal(published, "gold"),
      silver: metal(published, "silver"),
      bronze: metal(published, "bronze"),
      competitions: new Set(published.map((item) => local(item.competition))).size,
      teams: published.filter(isNamedGroup).length,
      kyorugi,
      poomsae,
    };
  }

  function honourStats() {
    const stats = honourBreakdown();
    return [
      {
        value: stats.participations,
        label: a11y("Participations publiées", "Published participations"),
      },
      {
        value: stats.medals,
        label: a11y("Médailles publiées", "Published medals"),
      },
      {
        value: stats.gold,
        label: a11y("Médailles d’or", "Gold medals"),
      },
      {
        value: stats.competitions,
        label: a11y("Compétitions distinctes", "Distinct competitions"),
      },
    ];
  }

  function statsMarkup() {
    return honourStats()
      .map(
        (item) => `
          <div class="stat">
            <span class="stat-value">${item.value}</span>
            <span class="stat-label">${item.label}</span>
            ${demoLabel()}
          </div>
        `,
      )
      .join("");
  }

  function demoLabel() {
    return `<span class="demo-label">${labels[state.language].fictitious}</span>`;
  }

  function pageLink(screen, label, className = "") {
    const isCurrent = className.split(" ").includes("is-current");
    return `<a class="${className}" href="#${screen}" data-screen="${screen}"${isCurrent ? ' aria-current="page"' : ""}>${label}</a>`;
  }

  function navMarkup(active) {
    const nav = ui().nav;
    return `
      ${pageLink("home", nav.home, active === "home" ? "is-current" : "")}
      <details class="nav-dropdown">
        <summary>${nav.club}</summary>
        <div class="nav-dropdown-menu">
          ${pageLink("club", state.language === "fr" ? "Présentation" : "About", active === "club" ? "is-current" : "")}
          ${pageLink("club", state.language === "fr" ? "Équipe encadrante" : "Coaching team")}
        </div>
      </details>
      <details class="nav-dropdown">
        <summary>${nav.disciplines}</summary>
        <div class="nav-dropdown-menu">
          ${pageLink("disciplines", state.language === "fr" ? "Vue d’ensemble" : "Overview", active === "disciplines" ? "is-current" : "")}
          ${pageLink("kyorugi", "Kyorugi", active === "kyorugi" ? "is-current" : "")}
          ${pageLink("poomsae", labels[state.language].poomsae, active === "poomsae" ? "is-current" : "")}
        </div>
      </details>
      ${pageLink("athletes", nav.athletes, active === "athletes" ? "is-current" : "")}
      ${pageLink("competitions", nav.competitions, active === "competitions" ? "is-current" : "")}
      ${pageLink("results", nav.results, active === "results" ? "is-current" : "")}
      ${pageLink("honours", nav.honours, active === "honours" ? "is-current" : "")}
      ${pageLink("calendar", nav.calendar, active === "calendar" ? "is-current" : "")}
      ${pageLink("news", nav.news, active === "news" ? "is-current" : "")}
      <details class="nav-dropdown">
        <summary>${nav.media}</summary>
        <div class="nav-dropdown-menu">
          ${pageLink("media", state.language === "fr" ? "Vue d’ensemble" : "Overview", active === "media" ? "is-current" : "")}
          ${pageLink("media", state.language === "fr" ? "Photos" : "Photos")}
          ${pageLink("media", state.language === "fr" ? "Vidéos" : "Videos")}
        </div>
      </details>
      ${pageLink("contact", nav.contact, active === "contact" ? "is-current" : "")}
    `;
  }

  function headerMarkup(active) {
    return `
      <header class="site-header" data-site-header data-a11y="${a11y("Navigation principale et changement de langue", "Main navigation and language switch")}">
        <div class="site-container header-inner">
          <a class="brand-link" href="#home" data-screen="home" aria-label="${ui().nav.home}">
            <img src="../../../logo.jpg" alt="" width="48" height="48" />
            <span class="brand-name">
              <strong>VAN THUYNE TAEKWONDO</strong>
              <span>Club Elite · ${labels[state.language].provisional}</span>
            </span>
          </a>
          <div class="mobile-controls">
            <button
              class="button menu-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="site-navigation"
              data-menu-toggle
            >
              ${ui().menu}
            </button>
            <button class="button mobile-language" type="button" data-switch-language aria-label="${ui().switchLanguage}">
              ${state.language === "fr" ? "EN" : "FR"}
            </button>
          </div>
          <nav id="site-navigation" class="site-nav" aria-label="${state.language === "fr" ? "Navigation principale" : "Main navigation"}">
            ${navMarkup(active)}
          </nav>
          <div class="header-actions">
            <button class="button language-button" type="button" data-switch-language aria-label="${ui().switchLanguage}">
              ${state.language === "fr" ? "EN" : "FR"}
            </button>
            ${pageLink("results", ui().resultsCta, "button button-primary")}
          </div>
        </div>
      </header>
    `;
  }

  function footerMarkup() {
    const nav = ui().nav;
    return `
      <footer class="site-footer">
        <div class="site-container footer-grid">
          <div>
            <h2>VAN THUYNE TAEKWONDO / ELITE</h2>
            <p>${labels[state.language].provisional}. ${labels[state.language].fictitious}.</p>
          </div>
          <div>
            <h3>${state.language === "fr" ? "Explorer" : "Explore"}</h3>
            <div class="footer-links">
              ${pageLink("club", nav.club)}
              ${pageLink("disciplines", nav.disciplines)}
              ${pageLink("athletes", nav.athletes)}
              ${pageLink("results", nav.results)}
            </div>
          </div>
          <div>
            <h3>${state.language === "fr" ? "Suivre" : "Follow"}</h3>
            <div class="footer-links">
              <a href="https://www.instagram.com/vanthuynetkd_officiel/">Instagram</a>
              <a href="https://www.youtube.com/@vanthuynetkdofficiel3760">YouTube</a>
              ${pageLink("media", nav.media)}
            </div>
          </div>
          <div>
            <h3>${state.language === "fr" ? "Informations" : "Information"}</h3>
            <div class="footer-links">
              ${pageLink("contact", nav.contact)}
              <a href="#utility" data-screen="utility">${state.language === "fr" ? "Mentions légales" : "Legal notice"}</a>
              <a href="#utility" data-screen="utility">${state.language === "fr" ? "Confidentialité" : "Privacy"}</a>
              <button class="button button-ghost" type="button" data-switch-language>${ui().switchLanguage}</button>
            </div>
          </div>
        </div>
        <div class="site-container footer-bottom">
          ${state.language === "fr" ? "Maquette de validation — aucune information réelle publiée." : "Review mockup — no real information published."}
        </div>
      </footer>
    `;
  }

  function publicShell(content, active = "") {
    return `
      <div class="site-shell">
        ${headerMarkup(active)}
        <main id="prototype-main" class="site-main" tabindex="-1">
          ${content}
        </main>
        ${footerMarkup()}
      </div>
    `;
  }

  function pageHero(title, lead, section, parentScreen = "", isDetail = false) {
    const breadcrumbTail = isDetail
      ? `${pageLink(parentScreen, section)}
         <span aria-hidden="true">/</span>
         <span aria-current="page">${title}</span>`
      : `<span aria-current="page">${section}</span>`;
    return `
      <section class="page-hero">
        <div class="site-container page-hero-inner">
          <nav class="breadcrumbs" aria-label="${state.language === "fr" ? "Fil d’Ariane" : "Breadcrumb"}">
            ${pageLink("home", ui().nav.home)}
            <span aria-hidden="true">/</span>
            ${breadcrumbTail}
          </nav>
          ${demoLabel()}
          <h1>${title}</h1>
          <p class="lead">${lead}</p>
        </div>
      </section>
    `;
  }

  function stateOverride() {
    if (state.viewState === "default" || state.viewState === "success") {
      return "";
    }

    const content = {
      empty: [ui().emptyTitle, ui().emptyText, "0"],
      missing: [ui().missingTitle, ui().missingText, state.language === "fr" ? "EN" : "FR"],
      error: [ui().errorTitle, ui().errorText, "!"],
    }[state.viewState];

    return `
      <section class="section">
        <div class="site-container">
          <div class="state-panel" role="${state.viewState === "error" ? "alert" : "status"}" data-a11y="${a11y("État explicite, jamais signalé par la couleur seule", "Explicit state, never conveyed by colour alone")}">
            <span class="state-code" aria-hidden="true">${content[2]}</span>
            <h2>${content[0]}</h2>
            <p>${content[1]}</p>
            <button class="button button-primary" type="button" data-reset-state>
              ${state.language === "fr" ? "Revenir à l’état normal" : "Return to normal state"}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  function mediaPlaceholder(label, extraClass = "") {
    return `
      <div class="media-placeholder ${extraClass}" role="img" aria-label="${label}">
        <span>${label}</span>
      </div>
    `;
  }

  function resultRows() {
    return publishedResults()
      .map((result) => {
        return `
          <tr>
            <td><span class="medal medal-${result.medal}">${medalName(result.medal)} · ${result.rank}</span></td>
            <td><strong>${resultParticipant(result)}</strong><br /><small>${local(result.category)}</small></td>
            <td>${local(result.competition)}</td>
            <td>${disciplineName(result.discipline)}</td>
            <td>${displayDate(result.date)}<br /><small>${local(result.place)}</small></td>
          </tr>
        `;
      })
      .join("");
  }

  function resultCards() {
    return publishedResults()
      .map((result) => {
        return `
          <article class="result-card">
            <div class="result-rank" aria-label="${labels[state.language].rank} ${result.rank}">${result.rank}</div>
            <div>
              <span class="medal medal-${result.medal}">${medalName(result.medal)}</span>
              <h3>${resultParticipant(result)}</h3>
              <dl>
                <dt>${labels[state.language].competition}</dt>
                <dd>${local(result.competition)}</dd>
                <dt>${labels[state.language].discipline}</dt>
                <dd>${disciplineName(result.discipline)}</dd>
                <dt>${labels[state.language].category}</dt>
                <dd>${local(result.category)}</dd>
                <dt>${labels[state.language].datePlace}</dt>
                <dd>${displayDate(result.date)} · ${local(result.place)}</dd>
              </dl>
              ${demoLabel()}
            </div>
          </article>
        `;
      })
      .join("");
  }

  function resultsBlock(limit = false, source = publishedResults()) {
    const published = source;
    const rows = limit ? published.slice(0, 2) : published;
    const desktopRows = rows
      .map((result) => {
        return `
          <tr>
            <td><span class="medal medal-${result.medal}">${medalName(result.medal)} · ${result.rank}</span></td>
            <td><strong>${resultParticipant(result)}</strong><br /><small>${local(result.category)}</small></td>
            <td>${local(result.competition)}</td>
            <td>${disciplineName(result.discipline)}</td>
            <td>${displayDate(result.date)}<br /><small>${local(result.place)}</small></td>
          </tr>
        `;
      })
      .join("");
    const mobileCards = rows
      .map((result) => {
        return `
          <article class="result-card">
            <div class="result-rank" aria-label="${labels[state.language].rank} ${result.rank}">${result.rank}</div>
            <div>
              <span class="medal medal-${result.medal}">${medalName(result.medal)}</span>
              <h3>${resultParticipant(result)}</h3>
              <dl>
                <dt>${labels[state.language].competition}</dt>
                <dd>${local(result.competition)}</dd>
                <dt>${labels[state.language].discipline}</dt>
                <dd>${disciplineName(result.discipline)}</dd>
                <dt>${labels[state.language].category}</dt>
                <dd>${local(result.category)}</dd>
                <dt>${labels[state.language].datePlace}</dt>
                <dd>${displayDate(result.date)} · ${local(result.place)}</dd>
              </dl>
              ${demoLabel()}
            </div>
          </article>
        `;
      })
      .join("");

    return `
      <div class="results-table-wrap" data-a11y="${a11y("Tableau sémantique pour comparer les résultats", "Semantic table for comparing results")}">
        <table class="results-table">
          <caption class="sr-only">${state.language === "fr" ? "Résultats sportifs fictifs" : "Fictional sports results"}</caption>
          <thead>
            <tr>
              <th scope="col">${labels[state.language].rank}</th>
              <th scope="col">${labels[state.language].athlete}</th>
              <th scope="col">${labels[state.language].competition}</th>
              <th scope="col">${labels[state.language].discipline}</th>
              <th scope="col">${labels[state.language].datePlace}</th>
            </tr>
          </thead>
          <tbody>${desktopRows}</tbody>
        </table>
      </div>
      <div class="result-cards" data-a11y="${a11y("Cartes mobiles équivalentes au tableau", "Mobile cards equivalent to the table")}">${mobileCards}</div>
    `;
  }

  function athleteCards() {
    return data.athletes
      .map(
        (athlete) => `
          <article class="card athlete-card">
            ${mediaPlaceholder(
              `${state.language === "fr" ? "Silhouette fictive de" : "Fictional silhouette for"} ${local(athlete.name)}`,
            )}
            <div class="tag-row">
              <span class="tag tag-${athlete.discipline}">${disciplineName(athlete.discipline)}</span>
              ${demoLabel()}
            </div>
            <h3>${local(athlete.name)}</h3>
            <p>${local(athlete.category)}</p>
            ${pageLink("athlete", ui().viewDetail, "card-link")}
          </article>
        `,
      )
      .join("");
  }

  function renderHome() {
    const t = text();
    const override = stateOverride();
    return publicShell(
      `
        <section class="hero">
          <div class="site-container hero-grid">
            <div class="hero-copy">
              ${demoLabel()}
              <p class="eyebrow">VAN THUYNE TAEKWONDO / ELITE</p>
              <h1 class="display">${t.homeTitle}</h1>
              <p class="lead">${t.homeLead}</p>
              <div class="hero-actions">
                ${pageLink("results", ui().resultsCta, "button button-primary")}
                ${pageLink("club", ui().nav.club, "button button-secondary")}
              </div>
            </div>
            <div class="hero-art" aria-label="${state.language === "fr" ? "Composition abstraite sportive provisoire" : "Provisional abstract sports composition"}" role="img">
              <div class="hero-disc"></div>
              <div class="action-mark"></div>
            </div>
          </div>
        </section>
        <section class="section-accent section-compact">
          <div class="site-container section-heading">
            <div>
              <p class="eyebrow">${t.nextEvent}</p>
              <h2>${t.nextEventText}</h2>
            </div>
            ${pageLink("calendar", ui().nav.calendar, "button button-secondary")}
          </div>
        </section>
        ${override || `
          <section class="section">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${state.language === "fr" ? "Disciplines" : "Disciplines"}</p>
                  <h2>${t.disciplinesTitle}</h2>
                  <p>${t.disciplinesLead}</p>
                </div>
              </div>
              <div class="grid-2">
                <article class="card discipline-card">
                  <p class="eyebrow">Kyorugi</p>
                  <h3>${labels[state.language].combat}</h3>
                  <p>${t.combatBody}</p>
                  ${pageLink("kyorugi", ui().readMore, "card-link")}
                </article>
                <article class="card discipline-card">
                  <p class="eyebrow">Poomsae</p>
                  <h3>${labels[state.language].poomsae}</h3>
                  <p>${t.poomsaeBody}</p>
                  ${pageLink("poomsae", ui().readMore, "card-link")}
                </article>
              </div>
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${ui().nav.results}</p>
                  <h2>${state.language === "fr" ? "Derniers résultats" : "Latest results"}</h2>
                  <p>${labels[state.language].fictitious}</p>
                </div>
                ${pageLink("results", ui().resultsCta, "button button-secondary")}
              </div>
              ${resultsBlock(true)}
            </div>
          </section>
          <section class="section section-dark">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${ui().nav.honours}</p>
                  <h2>${state.language === "fr" ? "Une lecture claire du palmarès" : "A clear view of honours"}</h2>
                  <p>${state.language === "fr" ? "Les chiffres finaux seront calculés depuis les résultats publiés." : "Final figures will be calculated from published results."}</p>
                </div>
              </div>
              <div class="stat-grid">
                ${statsMarkup()}
              </div>
            </div>
          </section>
          <section class="section">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${ui().nav.news}</p>
                  <h2>${state.language === "fr" ? "La vie sportive du club" : "The club’s sporting life"}</h2>
                </div>
                ${pageLink("news", ui().nav.news, "button button-secondary")}
              </div>
              <div class="grid-2">
                ${data.news
                  .map(
                    (item) => `
                      <article class="card">
                        ${mediaPlaceholder(state.language === "fr" ? "Emplacement média autorisé" : "Approved media placeholder")}
                        <div class="tag-row"><span class="tag">${local(item.category)}</span>${demoLabel()}</div>
                        <h3>${local(item.title)}</h3>
                        <p>${local(item.excerpt)}</p>
                        <small>${item.date}</small>
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          </section>
        `}
      `,
      "home",
    );
  }

  function renderClub() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.clubTitle, t.clubLead, ui().nav.club)}
        ${stateOverride() || `
          <section class="section">
            <div class="site-container grid-2">
              <div class="content-prose">
                <p class="eyebrow">${state.language === "fr" ? "Histoire et valeurs" : "History and values"}</p>
                <h2>${state.language === "fr" ? "Un contenu institutionnel vérifié" : "Verified institutional content"}</h2>
                <p>${t.clubBody}</p>
                <p>${t.clubBody}</p>
                ${demoLabel()}
              </div>
              ${mediaPlaceholder(state.language === "fr" ? "Photographie d’équipe autorisée" : "Approved team photograph", "profile-portrait")}
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${state.language === "fr" ? "Encadrement" : "Coaching"}</p>
                  <h2>${t.coachTitle}</h2>
                  <p>${t.coachBody}</p>
                </div>
              </div>
              <div class="grid-3">
                ${["A", "B", "C"]
                  .map(
                    (letter) => `
                      <article class="card">
                        <div class="avatar" aria-hidden="true">${letter}</div>
                        <div class="tag-row">${demoLabel()}</div>
                        <h3>${state.language === "fr" ? `Encadrant Démo ${letter}` : `Demo Coach ${letter}`}</h3>
                        <p>${state.language === "fr" ? "Fonction à valider" : "Role to be approved"}</p>
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          </section>
        `}
      `,
      "club",
    );
  }

  function renderDisciplines() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.disciplinesTitle, t.disciplinesLead, ui().nav.disciplines)}
        ${stateOverride() || `
          <section class="section">
            <div class="site-container grid-2">
              <article class="card discipline-card">
                <p class="eyebrow">Kyorugi</p>
                <h2>${labels[state.language].combat}</h2>
                <p>${t.combatBody}</p>
                <ul>
                  <li>${state.language === "fr" ? "Préparation sportive" : "Sport preparation"}</li>
                  <li>${state.language === "fr" ? "Catégories contrôlées" : "Controlled categories"}</li>
                  <li>${state.language === "fr" ? "Résultats liés" : "Linked results"}</li>
                </ul>
                ${demoLabel()}
              </article>
              <article class="card discipline-card">
                <p class="eyebrow">Poomsae</p>
                <h2>${labels[state.language].poomsae}</h2>
                <p>${t.poomsaeBody}</p>
                <ul>
                  <li>${state.language === "fr" ? "Individuel, paire, équipe" : "Individual, pair, team"}</li>
                  <li>${state.language === "fr" ? "Précision technique" : "Technical precision"}</li>
                  <li>${state.language === "fr" ? "Résultats liés" : "Linked results"}</li>
                </ul>
                ${demoLabel()}
              </article>
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${ui().nav.results}</p>
                  <h2>${state.language === "fr" ? "Performances par discipline" : "Performance by discipline"}</h2>
                </div>
              </div>
              ${resultsBlock(true)}
            </div>
          </section>
        `}
      `,
      "disciplines",
    );
  }

  function renderDisciplineDetail(kind) {
    const isKyorugi = kind === "kyorugi";
    const title = isKyorugi ? "Kyorugi" : "Poomsae";
    const lead = isKyorugi
      ? a11y(
          "Discipline principale du club : stratégie, engagement et progression en combat.",
          "The club’s primary discipline: strategy, commitment and progression in sparring.",
        )
      : a11y(
          "Une discipline complète fondée sur la précision, la maîtrise et l’expression technique.",
          "A complete discipline built on precision, control and technical expression.",
        );
    const points = isKyorugi
      ? [
          a11y("Préparation tactique fictive", "Fictional tactical preparation"),
          a11y("Catégories et pesées contrôlées", "Controlled categories and weigh-ins"),
          a11y("Suivi individuel des performances", "Individual performance tracking"),
        ]
      : [
          a11y("Formats individuel, paire et équipe", "Individual, pair and team formats"),
          a11y("Précision et présentation technique", "Precision and technical presentation"),
          a11y("Suivi des notes et classements", "Score and ranking tracking"),
        ];
    const disciplineResults = publishedResults().filter(
      (result) => result.discipline === kind,
    );
    return publicShell(
      `
        ${pageHero(title, lead, ui().nav.disciplines, "disciplines", true)}
        ${stateOverride() || `
          <section class="section">
            <div class="site-container grid-2">
              <article class="content-prose">
                <p class="eyebrow">${isKyorugi ? a11y("Discipline principale", "Primary discipline") : a11y("Discipline complète", "Complete discipline")}</p>
                <h2>${a11y("Principes de démonstration", "Demonstration principles")}</h2>
                <p>${isKyorugi ? text().combatBody : text().poomsaeBody}</p>
                <ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul>
                ${demoLabel()}
              </article>
              ${mediaPlaceholder(a11y(`Visuel ${title} autorisé`, `Approved ${title} visual`), "profile-portrait")}
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container">
              <div class="section-heading"><div><p class="eyebrow">${ui().nav.results}</p><h2>${a11y(`Résultats ${title} publiés`, `Published ${title} results`)}</h2><p>${disciplineResults.length} ${a11y("participation(s) fictive(s)", "fictional participation(s)")}</p></div></div>
              ${disciplineResults.length ? resultsBlock(false, disciplineResults) : `<div class="notice notice-info">${ui().emptyText}</div>`}
            </div>
          </section>
        `}
      `,
      kind,
    );
  }

  function renderKyorugi() {
    return renderDisciplineDetail("kyorugi");
  }

  function renderPoomsae() {
    return renderDisciplineDetail("poomsae");
  }

  function renderAthletes() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.athletesTitle, t.athletesLead, ui().nav.athletes)}
        ${stateOverride() || `
          <section class="section section-muted">
            <div class="site-container">
              <form class="filter-bar" data-demo-form data-a11y="${a11y("Filtres regroupés avec libellés visibles", "Grouped filters with visible labels")}">
                <div class="field">
                  <label for="athlete-discipline">${labels[state.language].discipline}</label>
                  <select id="athlete-discipline">
                    <option>${labels[state.language].all}</option>
                    <option>${labels[state.language].combat}</option>
                    <option>${labels[state.language].poomsae}</option>
                  </select>
                </div>
                <div class="field">
                  <label for="athlete-search">${state.language === "fr" ? "Nom affiché" : "Display name"}</label>
                  <input id="athlete-search" type="search" />
                </div>
                <button class="button button-primary" type="submit">${state.language === "fr" ? "Appliquer" : "Apply"}</button>
                <button class="button button-secondary" type="reset">${labels[state.language].reset}</button>
              </form>
              <div class="grid-3">${athleteCards()}</div>
            </div>
          </section>
        `}
      `,
      "athletes",
    );
  }

  function renderAthlete() {
    const t = text();
    const athlete = data.athletes[0];
    return publicShell(
      `
        ${pageHero(local(athlete.name), t.profileBody, ui().nav.athletes, "athletes", true)}
        ${stateOverride() || `
          <section class="section">
            <div class="site-container profile-layout">
              ${mediaPlaceholder(state.language === "fr" ? "Portrait autorisé ou silhouette" : "Approved portrait or silhouette", "profile-portrait")}
              <div>
                <div class="tag-row">
                  <span class="tag tag-kyorugi">${labels[state.language].combat}</span>
                  <span class="tag">${local(athlete.category)}</span>
                  ${demoLabel()}
                </div>
                <h2>${state.language === "fr" ? "Parcours public" : "Public journey"}</h2>
                <p class="lead">${t.profileBody}</p>
                <p>${t.profileBody}</p>
                <h2>${state.language === "fr" ? "Résultats liés" : "Linked results"}</h2>
                ${resultsBlock(true)}
              </div>
            </div>
          </section>
        `}
      `,
      "",
    );
  }

  function renderResults() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.resultsTitle, t.resultsLead, ui().nav.results)}
        ${stateOverride() || `
          <section class="section section-muted">
            <div class="site-container">
              <form class="filter-bar" data-demo-form data-a11y="${a11y("Filtres accessibles et réinitialisables", "Accessible, resettable filters")}">
                ${[
                  [state.language === "fr" ? "Année" : "Year", ["2026", "2025"]],
                  [labels[state.language].discipline, [labels[state.language].all, labels[state.language].combat, labels[state.language].poomsae]],
                  [labels[state.language].athlete, [labels[state.language].all, local(data.athletes[0].name), local(data.athletes[1].name)]],
                  [state.language === "fr" ? "Médaille" : "Medal", [labels[state.language].all, labels[state.language].gold, labels[state.language].silver, labels[state.language].bronze]],
                ]
                  .map(
                    ([label, options], index) => `
                      <div class="field">
                        <label for="filter-${index}">${label}</label>
                        <select id="filter-${index}">
                          ${options.map((option) => `<option>${option}</option>`).join("")}
                        </select>
                      </div>
                    `,
                  )
                  .join("")}
                <button class="button button-secondary" type="reset">${labels[state.language].reset}</button>
              </form>
              <p><strong>${publishedResults().length}</strong> ${state.language === "fr" ? "résultats fictifs publiés" : "published fictional results"}</p>
              ${resultsBlock()}
            </div>
          </section>
          <section class="section section-dark">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${ui().nav.honours}</p>
                  <h2>${state.language === "fr" ? "Agrégats calculés" : "Calculated aggregates"}</h2>
                  <p>${state.language === "fr" ? "Données exclusivement fictives pour la maquette." : "Fictional mockup data only."}</p>
                </div>
              </div>
              <div class="stat-grid">
                ${statsMarkup()}
              </div>
            </div>
          </section>
        `}
      `,
      "results",
    );
  }

  function renderHonours() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.honoursTitle, state.language === "fr" ? "Statistiques calculées uniquement depuis les résultats publiés." : "Statistics calculated solely from published results.", ui().nav.honours)}
        ${stateOverride() || `
          <section class="section section-dark">
            <div class="site-container">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">${labels[state.language].fictitious}</p>
                  <h2>${state.language === "fr" ? "Vue globale de démonstration" : "Demonstration overview"}</h2>
                  <p>${state.language === "fr" ? "Chaque total indique son périmètre et sera recalculé à la compilation." : "Every total states its scope and will be recalculated during the build."}</p>
                </div>
              </div>
              <div class="stat-grid">
                ${statsMarkup()}
              </div>
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container grid-2">
              <article class="card">
                <p class="eyebrow">${labels[state.language].combat}</p>
                <h2>${state.language === "fr" ? "Répartition Kyorugi" : "Kyorugi breakdown"}</h2>
                <p><strong>${honourBreakdown().kyorugi.length}</strong> ${a11y("participations publiées", "published participations")} · <strong>${honourBreakdown().kyorugi.filter((item) => item.medal !== "none").length}</strong> ${a11y("médailles", "medals")}</p>
                ${demoLabel()}
              </article>
              <article class="card">
                <p class="eyebrow">${labels[state.language].poomsae}</p>
                <h2>${state.language === "fr" ? "Répartition Poomsae" : "Poomsae breakdown"}</h2>
                <p><strong>${honourBreakdown().poomsae.length}</strong> ${a11y("participations publiées", "published participations")} · <strong>${honourBreakdown().poomsae.filter((item) => item.medal !== "none").length}</strong> ${a11y("médailles", "medals")}</p>
                ${demoLabel()}
              </article>
            </div>
          </section>
        `}
      `,
      "honours",
    );
  }

  function renderCompetitions() {
    return publicShell(
      `
        ${pageHero(ui().nav.competitions, state.language === "fr" ? "Compétitions à venir et archives publiées." : "Upcoming competitions and published archives.", ui().nav.competitions)}
        ${stateOverride() || `
          <section class="section section-muted">
            <div class="site-container">
              <form class="filter-bar" data-demo-form data-a11y="${a11y("Filtres de compétition accessibles", "Accessible competition filters")}">
                <div class="field">
                  <label for="competition-year">${state.language === "fr" ? "Année" : "Year"}</label>
                  <select id="competition-year"><option>2026</option><option>2025</option></select>
                </div>
                <div class="field">
                  <label for="competition-discipline">${labels[state.language].discipline}</label>
                  <select id="competition-discipline">
                    <option>${labels[state.language].all}</option>
                    <option>${labels[state.language].combat}</option>
                    <option>${labels[state.language].poomsae}</option>
                  </select>
                </div>
                <button class="button button-secondary" type="reset">${labels[state.language].reset}</button>
              </form>
              <div class="grid-3">
                ${publishedResults()
                  .map(
                    (result) => `
                      <article class="card">
                        ${mediaPlaceholder(state.language === "fr" ? "Média de compétition autorisé" : "Approved competition media")}
                        <div class="tag-row">
                          <span class="tag tag-${result.discipline}">${disciplineName(result.discipline)}</span>
                          ${demoLabel()}
                        </div>
                        <p class="eyebrow">${result.date}</p>
                        <h2>${local(result.competition)}</h2>
                        <p>${local(result.place)}</p>
                        ${pageLink("competition", ui().viewDetail, "button button-secondary")}
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          </section>
        `}
      `,
      "competitions",
    );
  }

  function renderCompetition() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.competitionTitle, state.language === "fr" ? "12 octobre 2026 · Gymnase Exemple · France" : "12 October 2026 · Example Sports Hall · France", ui().nav.competitions, "competitions", true)}
        ${stateOverride() || `
          <section class="section">
            <div class="site-container grid-2">
              <div class="content-prose">
                <div class="tag-row">
                  <span class="tag tag-kyorugi">${labels[state.language].combat}</span>
                  <span class="tag">${state.language === "fr" ? "Niveau fictif" : "Fictional level"}</span>
                  ${demoLabel()}
                </div>
                <h2>${state.language === "fr" ? "Résumé de démonstration" : "Demonstration summary"}</h2>
                <p>${state.language === "fr" ? "Cette page montre les relations entre compétition, participants, résultats et médias sans utiliser de fait réel." : "This page shows relationships between a competition, participants, results and media without using real facts."}</p>
                <h2>${ui().nav.results}</h2>
              </div>
              ${mediaPlaceholder(state.language === "fr" ? "Photographie de compétition autorisée" : "Approved competition photograph", "profile-portrait")}
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container">${resultsBlock()}</div>
          </section>
          <section class="section">
            <div class="site-container">
              <div class="section-heading">
                <div><p class="eyebrow">${ui().nav.media}</p><h2>${state.language === "fr" ? "Médias associés" : "Related media"}</h2></div>
              </div>
              <div class="gallery-grid">
                ${[1, 2, 3]
                  .map(
                    (item) => `<button class="gallery-item" type="button" data-open-dialog>${state.language === "fr" ? `Média fictif ${item}` : `Fictional media ${item}`}</button>`,
                  )
                  .join("")}
              </div>
            </div>
          </section>
        `}
      `,
      "",
    );
  }

  function renderCalendar() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.calendarTitle, state.language === "fr" ? "Compétitions, stages et événements publiés." : "Published competitions, workshops and events.", ui().nav.calendar)}
        ${stateOverride() || `
          <section class="section section-muted">
            <div class="site-container">
              <div class="section-heading"><div><p class="eyebrow">${labels[state.language].upcoming}</p><h2>${state.language === "fr" ? "Prochaines échéances" : "Upcoming dates"}</h2></div></div>
              <div class="timeline">
                ${data.events
                  .map(
                    (event) => `
                      <article class="event-row">
                        <div class="event-date">${event.date}<br /><small>${event.time} CET</small></div>
                        <div>
                          <div class="tag-row"><span class="tag tag-${event.discipline}">${disciplineName(event.discipline)}</span>${demoLabel()}</div>
                          <h3>${local(event.title)}</h3>
                          <p>${local(event.place)}</p>
                        </div>
                        <button class="button button-secondary" type="button">${ui().viewDetail}</button>
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          </section>
        `}
      `,
      "calendar",
    );
  }

  function renderNews() {
    const t = text();
    const first = data.news[0];
    return publicShell(
      `
        ${pageHero(t.newsTitle, state.language === "fr" ? "Actualités et communications officielles." : "News and official communications.", ui().nav.news)}
        ${stateOverride() || `
          <section class="section">
            <div class="site-container news-feature">
              ${mediaPlaceholder(state.language === "fr" ? "Image principale autorisée" : "Approved lead image")}
              <article class="card">
                <div class="tag-row"><span class="tag">${local(first.category)}</span>${demoLabel()}</div>
                <p class="eyebrow">${first.date}</p>
                <h2>${local(first.title)}</h2>
                <p class="lead">${local(first.excerpt)}</p>
                <p>${state.language === "fr" ? "Texte fictif de longueur éditoriale destiné à valider une mise en page d’article et ses relations." : "Fictional editorial copy used to validate an article layout and its relationships."}</p>
                <button class="button button-primary" type="button">${ui().readMore}</button>
              </article>
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container grid-2">
              ${data.news
                .map(
                  (item) => `
                    <article class="card">
                      <p class="eyebrow">${item.date}</p>
                      <div class="tag-row"><span class="tag">${local(item.category)}</span>${demoLabel()}</div>
                      <h3>${local(item.title)}</h3>
                      <p>${local(item.excerpt)}</p>
                    </article>
                  `,
                )
                .join("")}
            </div>
          </section>
        `}
      `,
      "news",
    );
  }

  function renderMedia() {
    const t = text();
    return publicShell(
      `
        ${pageHero(t.mediaTitle, state.language === "fr" ? "Galeries autorisées et vidéos chargées à la demande." : "Approved galleries and videos loaded on demand.", ui().nav.media)}
        ${stateOverride() || `
          <section class="section">
            <div class="site-container">
              <div class="section-heading">
                <div><p class="eyebrow">${state.language === "fr" ? "Photos" : "Photos"}</p><h2>${state.language === "fr" ? "Galerie fictive" : "Fictional gallery"}</h2></div>
              </div>
              <div class="gallery-grid" data-a11y="${a11y("Visionneuse clavier avec restauration du focus", "Keyboard gallery with focus restoration")}">
                ${[1, 2, 3, 4, 5, 6]
                  .map(
                    (item) => `<button class="gallery-item" type="button" data-open-dialog>${state.language === "fr" ? `Emplacement photo ${item}` : `Photo placeholder ${item}`}</button>`,
                  )
                  .join("")}
              </div>
            </div>
          </section>
          <section class="section section-muted">
            <div class="site-container">
              <div class="section-heading"><div><p class="eyebrow">YouTube</p><h2>${state.language === "fr" ? "Vidéo chargée sur action" : "Video loaded on action"}</h2></div></div>
              <div class="video-placeholder">
                <div class="video-screen" data-video-screen>
                  <button class="play-button" type="button" data-load-video aria-label="${state.language === "fr" ? "Charger la vidéo fictive" : "Load fictional video"}">▶</button>
                </div>
                <div>
                  ${demoLabel()}
                  <h3>${state.language === "fr" ? "Résumé vidéo fictif" : "Fictional video recap"}</h3>
                  <p>${state.language === "fr" ? "Le lecteur réel ne sera chargé qu’après consentement d’interaction." : "The real player will only load after user interaction."}</p>
                  <a href="https://www.youtube.com/@vanthuynetkdofficiel3760">${state.language === "fr" ? "Ouvrir la chaîne YouTube" : "Open the YouTube channel"}</a>
                </div>
              </div>
            </div>
          </section>
        `}
      `,
      "media",
    );
  }

  function renderContact() {
    const t = text();
    const showError = state.viewState === "error";
    const showSuccess = state.viewState === "success";
    return publicShell(
      `
        ${pageHero(t.contactTitle, state.language === "fr" ? "Un formulaire minimal, accessible et protégé." : "A minimal, accessible and protected form.", ui().nav.contact)}
        <section class="section section-muted">
          <div class="site-container contact-grid">
            <aside class="card">
              <p class="eyebrow">${state.language === "fr" ? "Informations publiques" : "Public information"}</p>
              <h2>${state.language === "fr" ? "Coordonnées à fournir" : "Contact details to provide"}</h2>
              <p>${state.language === "fr" ? "Aucune adresse personnelle n’est utilisée dans la maquette." : "No personal address is used in this mockup."}</p>
              ${demoLabel()}
            </aside>
            <form class="form-card" data-contact-form novalidate data-a11y="${a11y("Libellés visibles, résumé d’erreurs et statut annoncé", "Visible labels, error summary and announced status")}">
              <h2>${state.language === "fr" ? "Envoyer un message" : "Send a message"}</h2>
              <p>${labels[state.language].formDemo}</p>
              ${showError ? `
                <div class="error-summary" role="alert" tabindex="-1" data-error-summary>
                  <strong>${state.language === "fr" ? "Deux champs sont à corriger" : "Two fields need attention"}</strong>
                  <ul>
                    <li><a href="#contact-email">${state.language === "fr" ? "Adresse de réponse" : "Reply address"}</a></li>
                    <li><a href="#contact-message">${state.language === "fr" ? "Message" : "Message"}</a></li>
                  </ul>
                </div>
              ` : ""}
              ${showSuccess ? `<div class="notice notice-success" role="status"><strong>${state.language === "fr" ? "Démonstration réussie" : "Demonstration successful"}</strong><br />${state.language === "fr" ? "Aucune donnée n’a été envoyée." : "No data was sent."}</div>` : ""}
              <div class="form-grid">
                <div class="field">
                  <label for="contact-name">${state.language === "fr" ? "Nom" : "Name"}</label>
                  <input id="contact-name" name="name" autocomplete="name" value="${escapeHtml(state.contactValues.name)}" />
                </div>
                <div class="field ${showError ? "is-invalid" : ""}">
                  <label for="contact-email">${state.language === "fr" ? "Adresse de réponse" : "Reply address"}</label>
                  <input id="contact-email" name="email" type="email" autocomplete="email" value="${escapeHtml(state.contactValues.email)}" aria-invalid="${showError ? "true" : "false"}" aria-describedby="email-help ${showError ? "email-error" : ""}" />
                  <span id="email-help" class="field-help">${state.language === "fr" ? "Utilisée uniquement pour répondre." : "Used only to reply."}</span>
                  ${showError ? `<span id="email-error" class="field-error">${state.language === "fr" ? "Format fictif invalide." : "Invalid fictional format."}</span>` : ""}
                </div>
                <div class="field field-full">
                  <label for="contact-subject">${state.language === "fr" ? "Objet" : "Subject"}</label>
                  <select id="contact-subject" name="subject">
                    <option value="general" ${state.contactValues.subject === "general" ? "selected" : ""}>${state.language === "fr" ? "Information générale" : "General information"}</option>
                    <option value="training" ${state.contactValues.subject === "training" ? "selected" : ""}>${state.language === "fr" ? "Entraînement" : "Training"}</option>
                    <option value="competition" ${state.contactValues.subject === "competition" ? "selected" : ""}>${state.language === "fr" ? "Compétition" : "Competition"}</option>
                    <option value="media" ${state.contactValues.subject === "media" ? "selected" : ""}>${state.language === "fr" ? "Médias / droit à l’image" : "Media / image rights"}</option>
                    <option value="privacy" ${state.contactValues.subject === "privacy" ? "selected" : ""}>${state.language === "fr" ? "Données personnelles" : "Personal data"}</option>
                    <option value="other" ${state.contactValues.subject === "other" ? "selected" : ""}>${state.language === "fr" ? "Autre" : "Other"}</option>
                  </select>
                </div>
                <div class="field field-full ${showError ? "is-invalid" : ""}">
                  <label for="contact-message">${state.language === "fr" ? "Message" : "Message"}</label>
                  <textarea id="contact-message" name="message" aria-invalid="${showError ? "true" : "false"}" aria-describedby="${showError ? "message-error" : ""}">${escapeHtml(state.contactValues.message)}</textarea>
                  ${showError ? `<span id="message-error" class="field-error">${state.language === "fr" ? "Saisissez un message de démonstration." : "Enter a demonstration message."}</span>` : ""}
                </div>
                <p class="field-full field-help">
                  ${state.language === "fr"
                    ? "Le message sert uniquement à répondre à votre demande. Ne transmettez pas de données sensibles ni d’information concernant un mineur. Les durées, destinataires et mentions légales seront validés avant mise en ligne."
                    : "This message is used only to reply to your request. Do not send sensitive data or information about a minor. Retention, recipients and legal notices will be validated before launch."}
                  ${pageLink("utility", state.language === "fr" ? "Politique de confidentialité (emplacement)" : "Privacy policy (placeholder)")}
                </p>
                <div class="field-full inline-actions">
                  <button class="button button-primary" type="submit">${state.language === "fr" ? "Simuler l’envoi" : "Simulate sending"}</button>
                  <span class="field-help">${state.language === "fr" ? "Aucune transmission réelle." : "No real transmission."}</span>
                </div>
              </div>
            </form>
          </div>
        </section>
      `,
      "contact",
    );
  }

  function adminNavigation(active) {
    const items = [
      ["admin-dashboard", state.language === "fr" ? "Vue d’ensemble" : "Overview"],
      ["admin-contents", state.language === "fr" ? "Contenus" : "Content"],
      ["admin-athletes", ui().nav.athletes],
      ["admin-competitions", ui().nav.competitions],
      ["admin-results", ui().nav.results],
      ["admin-permissions", state.language === "fr" ? "Accès et rôles" : "Access and roles"],
    ];
    return items
      .map(
        ([screen, label]) => `
          <a href="#${screen}" data-screen="${screen}" ${screen === active ? 'aria-current="page"' : ""}>${label}</a>
        `,
      )
      .join("");
  }

  function adminShell(content, active = "admin-dashboard") {
    return `
      <div class="admin-shell">
        <aside class="admin-sidebar" data-a11y="${a11y("Collections visibles selon le rôle retenu", "Collections visible according to the selected role")}">
          <a class="brand-link" href="#admin-dashboard" data-screen="admin-dashboard">
            <img src="../../../logo.jpg" alt="" width="48" height="48" />
            <span class="brand-name"><strong>VTTKD</strong><span>ADMIN · DÉMO</span></span>
          </a>
          <nav class="admin-nav" aria-label="${state.language === "fr" ? "Collections" : "Collections"}">
            ${adminNavigation(active)}
          </nav>
        </aside>
        <div class="admin-main">
          <header class="admin-topbar">
            <div>
              <strong>${text().adminTitle}</strong>
              <div class="tag-row"><span class="status-badge status-draft">${labels[state.language].fictitious}</span></div>
            </div>
            <div class="inline-actions">
              <button class="button language-button" style="color: var(--brand-900); border-color: var(--line)" type="button" data-switch-language>${state.language === "fr" ? "EN" : "FR"}</button>
              ${pageLink("home", state.language === "fr" ? "Voir le site" : "View site", "button button-secondary")}
            </div>
          </header>
          <main id="prototype-main" class="admin-content" tabindex="-1">
            <div class="notice notice-warning">${labels[state.language].adminDemo}</div>
            <div class="notice notice-info" role="note">${a11y("Simulation locale en mémoire : toutes les modifications sont réinitialisées au rechargement de la page.", "Local in-memory simulation: all changes are reset when the page reloads.")}</div>
            ${content}
          </main>
        </div>
      </div>
    `;
  }

  function renderAdminLogin() {
    return `
      <div class="login-layout">
        <section class="login-brand">
          ${demoLabel()}
          <p class="eyebrow">VAN THUYNE TAEKWONDO / ELITE</p>
          <h1 class="display">${state.language === "fr" ? "Gérer. Vérifier. Publier." : "Manage. Review. Publish."}</h1>
          <p class="lead">${labels[state.language].adminDemo}</p>
        </section>
        <section class="login-panel" id="prototype-main">
          <img src="../../../logo.jpg" alt="" width="64" height="64" />
          <h2>${state.language === "fr" ? "Accès à l’administration" : "Administration access"}</h2>
          <p>${state.language === "fr" ? "Chaque personne utilise son propre compte. L’interface finale dépendra du CMS retenu." : "Each person uses an individual account. The final interface depends on the selected CMS."}</p>
          <div class="notice notice-info">${state.language === "fr" ? "Scénarios à comparer : Decap Turbo avec rôles ou Pages CMS avec droits larges." : "Scenarios to compare: Decap Turbo with roles or Pages CMS with broad access."}</div>
          <button class="button button-primary" type="button" data-screen="admin-dashboard">${state.language === "fr" ? "Simuler la connexion" : "Simulate sign-in"}</button>
          <button class="button button-ghost" type="button" data-switch-language>${ui().switchLanguage}</button>
        </section>
      </div>
    `;
  }

  function renderAdminDashboard() {
    return adminShell(`
      <p class="eyebrow">${state.language === "fr" ? "Vue d’ensemble" : "Overview"}</p>
      <h1>${state.language === "fr" ? "Contenus à suivre" : "Content to review"}</h1>
      <p>${state.language === "fr" ? "Les valeurs sont fictives et servent uniquement à valider la hiérarchie." : "Values are fictional and only validate hierarchy."}</p>
      ${stateOverride() || `
        <div class="admin-metrics">
          ${[
            ["6", state.language === "fr" ? "Brouillons" : "Drafts"],
            ["3", state.language === "fr" ? "À relire" : "In review"],
            ["2", state.language === "fr" ? "Traductions" : "Translations"],
            ["1", state.language === "fr" ? "Droit média" : "Media right"],
          ]
            .map(
              ([value, label]) => `<div class="admin-metric"><strong>${value}</strong><span>${label}</span><br />${demoLabel()}</div>`,
            )
            .join("")}
        </div>
        <section class="admin-panel">
          <h2>${state.language === "fr" ? "Modifications récentes" : "Recent changes"}</h2>
          <div class="collection-list">
            ${[
              [state.language === "fr" ? "Tournoi Démonstration Horizon" : "Horizon Demonstration Tournament", "status-review", state.language === "fr" ? "À relire" : "In review"],
              [state.language === "fr" ? "Actualité fictive" : "Fictional news", "status-draft", state.language === "fr" ? "Brouillon" : "Draft"],
              [state.language === "fr" ? "Événement exemple" : "Example event", "status-published", state.language === "fr" ? "Publié démo" : "Demo published"],
            ]
              .map(
                ([name, className, status]) => `
                  <div class="collection-row">
                    <div><strong>${name}</strong><br /><small>${labels[state.language].fictitious}</small></div>
                    <span class="status-badge ${className}">${status}</span>
                    <button class="button button-secondary" type="button" data-screen="admin-editor">${state.language === "fr" ? "Ouvrir" : "Open"}</button>
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>
      `}
    `);
  }

  function renderAdminEditor() {
    const showError = state.viewState === "error";
    return adminShell(
      `
        <p class="eyebrow">${state.language === "fr" ? "Compétitions" : "Competitions"}</p>
        <h1>${state.language === "fr" ? "Modifier une compétition fictive" : "Edit a fictional competition"}</h1>
        <p>${state.language === "fr" ? "Faits communs, traductions et résultats sont séparés visuellement." : "Shared facts, translations and results are visually separated."}</p>
        ${showError ? `<div class="error-summary" role="alert"><strong>${state.language === "fr" ? "Trois erreurs empêchent la soumission" : "Three errors prevent submission"}</strong><ul><li>${state.language === "fr" ? "Lieu requis" : "Place required"}</li><li>${state.language === "fr" ? "Traduction EN incomplète" : "EN translation incomplete"}</li><li>${state.language === "fr" ? "Crédit média manquant" : "Missing media credit"}</li></ul></div>` : ""}
        <div class="admin-form-layout">
          <div>
            <section class="admin-panel">
              <div class="tag-row"><span class="status-badge status-draft">${state.language === "fr" ? "Brouillon" : "Draft"}</span>${demoLabel()}</div>
              <h2>${state.language === "fr" ? "Faits communs" : "Shared facts"}</h2>
              <div class="form-grid">
                <div class="field"><label for="admin-id">ID</label><input id="admin-id" value="demo-competition-horizon" readonly /></div>
                <div class="field"><label for="admin-date">${labels[state.language].date}</label><input id="admin-date" type="date" value="2026-10-12" /></div>
                <div class="field ${showError ? "is-invalid" : ""}"><label for="admin-place">${labels[state.language].place}</label><input id="admin-place" value="${showError ? "" : state.language === "fr" ? "Gymnase Exemple" : "Example Sports Hall"}" />${showError ? `<span class="field-error">${state.language === "fr" ? "Champ requis" : "Required field"}</span>` : ""}</div>
                <div class="field"><label for="admin-country">${state.language === "fr" ? "Pays" : "Country"}</label><input id="admin-country" value="France" /></div>
                <div class="field field-full"><span class="field-label">${labels[state.language].discipline}</span><label><input type="checkbox" checked /> ${labels[state.language].combat}</label><label><input type="checkbox" /> ${labels[state.language].poomsae}</label></div>
              </div>
            </section>
            <section class="admin-panel" data-a11y="${a11y("États de traduction explicites par langue", "Explicit translation states for each language")}">
              <div class="tabs" aria-label="${state.language === "fr" ? "Choisir la langue éditoriale" : "Choose editorial language"}">
                <button class="tab" type="button" aria-pressed="true" data-language-tab="fr">FR · ${state.language === "fr" ? "Validé" : "Approved"}</button>
                <button class="tab" type="button" aria-pressed="false" data-language-tab="en">EN · ${showError ? (state.language === "fr" ? "Incomplet" : "Incomplete") : state.language === "fr" ? "Brouillon" : "Draft"}</button>
              </div>
              <div data-translation-panel>
                <h2>${state.language === "fr" ? "Texte français" : "French copy"}</h2>
                <div class="field"><label for="admin-title">${state.language === "fr" ? "Titre" : "Title"}</label><input id="admin-title" value="Tournoi Démonstration Horizon" /></div>
                <div class="field"><label for="admin-summary">${state.language === "fr" ? "Résumé" : "Summary"}</label><textarea id="admin-summary">Contenu fictif clairement signalé.</textarea></div>
              </div>
            </section>
            <section class="admin-panel">
              <h2>${state.language === "fr" ? "Résultats liés" : "Linked results"}</h2>
              <div class="collection-list">
                ${state.results
                  .slice(0, 2)
                  .map(
                    (result) => `<div class="collection-row"><div><strong>${local(athleteFor(result.athlete).name)}</strong><br /><small>${local(result.category)}</small></div><span class="medal medal-${result.medal}">${medalName(result.medal)}</span><button class="button button-secondary" type="button">${state.language === "fr" ? "Modifier" : "Edit"}</button></div>`,
                  )
                  .join("")}
              </div>
              <button class="button button-secondary" type="button">${state.language === "fr" ? "Ajouter un résultat" : "Add a result"}</button>
            </section>
          </div>
          <aside>
            <section class="admin-panel">
              <h2>${state.language === "fr" ? "Validation" : "Validation"}</h2>
              <p><strong>FR</strong> · ${state.language === "fr" ? "Validé" : "Approved"}</p>
              <p><strong>EN</strong> · ${showError ? (state.language === "fr" ? "Incomplet" : "Incomplete") : state.language === "fr" ? "Brouillon" : "Draft"}</p>
              <p><strong>${state.language === "fr" ? "Média" : "Media"}</strong> · ${showError ? (state.language === "fr" ? "Crédit manquant" : "Credit missing") : "OK"}</p>
            </section>
            <section class="admin-panel">
              <h2>${state.language === "fr" ? "Actions" : "Actions"}</h2>
              <div class="inline-actions">
                <button class="button button-secondary" type="button">${state.language === "fr" ? "Aperçu" : "Preview"}</button>
                <button class="button button-primary" type="button">${state.language === "fr" ? "Soumettre à revue" : "Submit for review"}</button>
              </div>
              <p class="field-help">${state.language === "fr" ? "Aucune publication réelle." : "No real publication."}</p>
            </section>
          </aside>
        </div>
      `,
      "admin-editor",
    );
  }

  function statusName(value) {
    const values = {
      draft: ["Brouillon", "Draft"],
      published: ["Publié", "Published"],
      archived: ["Archivé", "Archived"],
      cancelled: ["Annulé", "Cancelled"],
    };
    return (values[value] || [value, value])[state.language === "fr" ? 0 : 1];
  }

  function statusClass(value) {
    return value === "published"
      ? "status-published"
      : value === "draft"
        ? "status-draft"
        : "status-review";
  }

  function compactAdminList(items, emptyText) {
    if (!items.length) {
      return `<div class="state-panel"><span class="state-code" aria-hidden="true">0</span><h2>${emptyText}</h2><p>${ui().emptyText}</p></div>`;
    }
    return `<div class="collection-list">${items.join("")}</div>`;
  }

  function renderAdminContents() {
    const override = stateOverride();
    return adminShell(
      `
        <p class="eyebrow">${a11y("Gestion", "Management")}</p>
        <h1>${a11y("Gestion des contenus", "Content management")}</h1>
        <p>${a11y("Pages, actualités et événements de démonstration bilingues.", "Bilingual demonstration pages, news and events.")}</p>
        ${override || `<section class="admin-panel"><h2>${a11y("Contenus fictifs", "Fictional content")}</h2>${compactAdminList(
          data.contents.map(
            (item) => `<article class="collection-row"><div><strong>${local(item.title)}</strong><br /><small>${local(item.type)} · ${item.id}</small></div><span class="status-badge ${statusClass(item.status)}">${statusName(item.status)}</span><button class="button button-secondary" type="button">${a11y("Modifier", "Edit")}</button></article>`,
          ),
          a11y("Aucun contenu", "No content"),
        )}</section>`}
      `,
      "admin-contents",
    );
  }

  function renderAdminAthletes() {
    const override = stateOverride();
    return adminShell(
      `
        <p class="eyebrow">${a11y("Gestion", "Management")}</p>
        <h1>${a11y("Gestion des athlètes", "Athlete management")}</h1>
        <p>${a11y("Profils entièrement fictifs, disponibles en français et en anglais.", "Entirely fictional profiles, available in French and English.")}</p>
        ${override || `<section class="admin-panel"><h2>${a11y("Athlètes fictifs", "Fictional athletes")}</h2>${compactAdminList(
          data.athletes.map(
            (athlete) => `<article class="collection-row"><div><strong>${local(athlete.name)}</strong><br /><small>${local(athlete.category)} · ${athlete.id}</small></div><span class="tag tag-${athlete.discipline}">${disciplineName(athlete.discipline)}</span><button class="button button-secondary" type="button">${a11y("Modifier", "Edit")}</button></article>`,
          ),
          a11y("Aucun athlète", "No athletes"),
        )}</section>`}
      `,
      "admin-athletes",
    );
  }

  function renderAdminCompetitions() {
    const override = stateOverride();
    return adminShell(
      `
        <p class="eyebrow">${a11y("Gestion", "Management")}</p>
        <h1>${a11y("Gestion des compétitions", "Competition management")}</h1>
        <p>${a11y("Compétitions fictives bilingues reliées aux résultats.", "Bilingual fictional competitions linked to results.")}</p>
        ${override || `<section class="admin-panel"><h2>${a11y("Compétitions fictives", "Fictional competitions")}</h2>${compactAdminList(
          data.competitions.map(
            (competition) => `<article class="collection-row"><div><strong>${local(competition.title)}</strong><br /><small>${displayDate(competition.date)} · ${competition.id}</small></div><span class="status-badge ${statusClass(competition.status)}">${statusName(competition.status)}</span><button class="button button-secondary" type="button" data-screen="admin-editor">${a11y("Modifier", "Edit")}</button></article>`,
          ),
          a11y("Aucune compétition", "No competitions"),
        )}</section>`}
      `,
      "admin-competitions",
    );
  }

  function renderAdminResults() {
    const override = stateOverride();
    const rows =
      state.viewState === "empty"
        ? []
        : state.results.map(
            (result) => `
              <article class="collection-row">
                <div>
                  <strong>${resultParticipant(result)}</strong><br />
                  <small>${local(result.competition)} · ${displayDate(result.date)} · ${result.id}</small>
                </div>
                <span class="status-badge ${statusClass(result.status)}">${statusName(result.status)}</span>
                <button class="button button-secondary" type="button" data-open-result="${result.id}">${a11y("Ouvrir", "Open")}</button>
              </article>
            `,
          );
    return adminShell(
      `
        <div class="admin-heading-actions">
          <div><p class="eyebrow">${a11y("Résultats", "Results")}</p><h1>${a11y("Liste des résultats", "Result list")}</h1><p>${a11y("Tous les statuts sont visibles ici ; seul « Publié » alimente le site public.", "All statuses are visible here; only “Published” feeds the public site.")}</p></div>
          <button class="button button-primary" type="button" data-start-create>${a11y("Créer un résultat", "Create result")}</button>
        </div>
        ${state.viewState === "success" ? `<div class="notice notice-success" role="status">${a11y("Opération de démonstration réussie.", "Demonstration operation successful.")}</div>` : ""}
        ${state.viewState === "missing" || state.viewState === "error" ? override : `<section class="admin-panel">${compactAdminList(rows, a11y("Aucun résultat", "No results"))}</section>`}
      `,
      "admin-results",
    );
  }

  function draftFromResult(result) {
    return {
      competitionId:
        data.competitions.find(
          (competition) => local(competition.title) === local(result.competition),
        )?.id || "demo-competition-horizon",
      competitionFr: result.competition.fr,
      competitionEn: result.competition.en,
      date: result.date,
      placeFr: result.place.fr,
      placeEn: result.place.en,
      discipline: result.discipline,
      participantType: result.participantType || "individual",
      athlete: result.athlete || "demo-athlete-a",
      teamNameFr: result.teamName?.fr || "",
      teamNameEn: result.teamName?.en || "",
      categoryFr: result.category.fr,
      categoryEn: result.category.en,
      rank: String(result.rank || ""),
      medal: result.medal,
      commentFr: result.comment?.fr || "",
      commentEn: result.comment?.en || "",
      source: result.source || "",
      status: result.status,
    };
  }

  function resultFromDraft(draft, existing = null) {
    const now = new Date().toISOString();
    const competition = data.competitions.find(
      (item) => item.id === draft.competitionId,
    );
    return {
      id: existing?.id || "",
      athlete: draft.athlete,
      participantType: draft.participantType,
      teamName:
        draft.participantType === "team" || draft.participantType === "pair"
          ? { fr: draft.teamNameFr, en: draft.teamNameEn }
          : "",
      competition: competition?.title || {
        fr: draft.competitionFr,
        en: draft.competitionEn,
      },
      date: draft.date,
      place: { fr: draft.placeFr, en: draft.placeEn },
      discipline: draft.discipline,
      category: { fr: draft.categoryFr, en: draft.categoryEn },
      rank: Number(draft.rank),
      medal: draft.medal,
      comment: { fr: draft.commentFr, en: draft.commentEn },
      source: draft.source,
      status: draft.status,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      history: existing?.history ? [...existing.history] : [],
    };
  }

  function resultErrorSummary() {
    const entries = Object.entries(state.resultErrors);
    if (!entries.length) return "";
    return `
      <div class="error-summary" role="alert" tabindex="-1" data-result-error-summary>
        <strong>${a11y(`${entries.length} champ(s) sont à corriger`, `${entries.length} field(s) need attention`)}</strong>
        <ul>${entries.map(([id, message]) => `<li><a href="#${id}">${message}</a></li>`).join("")}</ul>
      </div>
    `;
  }

  function fieldError(id) {
    return state.resultErrors[id]
      ? `<span id="${id}-error" class="field-error">${state.resultErrors[id]}</span>`
      : "";
  }

  function invalidClass(id) {
    return state.resultErrors[id] ? " is-invalid" : "";
  }

  function resultForm(mode) {
    const draft = state.resultDraft;
    const isTeam = isNamedGroup(draft);
    const isPoomsae = draft.discipline === "poomsae";
    return `
      ${resultErrorSummary()}
      <form class="admin-panel" data-result-form="${mode}" novalidate>
        <div class="form-grid">
          <div class="field field-full${invalidClass("result-competition")}">
            <label for="result-competition">${a11y("Compétition", "Competition")}</label>
            <select id="result-competition" name="competitionId" aria-invalid="${Boolean(state.resultErrors["result-competition"])}">
              ${data.competitions.map((item) => `<option value="${item.id}" ${draft.competitionId === item.id ? "selected" : ""}>${local(item.title)}</option>`).join("")}
            </select>${fieldError("result-competition")}
          </div>
          <div class="field${invalidClass("result-date")}"><label for="result-date">${labels[state.language].date}</label><input id="result-date" name="date" type="date" value="${escapeHtml(draft.date)}" aria-invalid="${Boolean(state.resultErrors["result-date"])}" />${fieldError("result-date")}</div>
          <div class="field${invalidClass("result-place-fr")}"><label for="result-place-fr">${a11y("Lieu (FR)", "Venue (FR)")}</label><input id="result-place-fr" name="placeFr" value="${escapeHtml(draft.placeFr)}" aria-invalid="${Boolean(state.resultErrors["result-place-fr"])}" />${fieldError("result-place-fr")}</div>
          <div class="field${invalidClass("result-place-en")}"><label for="result-place-en">${a11y("Lieu (EN)", "Venue (EN)")}</label><input id="result-place-en" name="placeEn" value="${escapeHtml(draft.placeEn)}" aria-invalid="${Boolean(state.resultErrors["result-place-en"])}" />${fieldError("result-place-en")}</div>
          <div class="field"><label for="result-discipline">${labels[state.language].discipline}</label><select id="result-discipline" name="discipline" data-result-adaptive><option value="kyorugi" ${draft.discipline === "kyorugi" ? "selected" : ""}>Kyorugi</option><option value="poomsae" ${draft.discipline === "poomsae" ? "selected" : ""}>Poomsae</option></select></div>
          <div class="field"><label for="result-participant-type">${a11y("Type de participation", "Participation type")}</label><select id="result-participant-type" name="participantType" data-result-adaptive><option value="individual" ${draft.participantType === "individual" ? "selected" : ""}>${a11y("Individuel", "Individual")}</option><option value="pair" ${draft.participantType === "pair" ? "selected" : ""}>${a11y("Paire", "Pair")}</option><option value="team" ${draft.participantType === "team" ? "selected" : ""}>${a11y("Équipe", "Team")}</option></select></div>
          ${
            isTeam
              ? `<div class="field${invalidClass("result-team-fr")}"><label for="result-team-fr">${a11y("Nom d’équipe (FR)", "Team name (FR)")}</label><input id="result-team-fr" name="teamNameFr" value="${escapeHtml(draft.teamNameFr)}" aria-invalid="${Boolean(state.resultErrors["result-team-fr"])}" />${fieldError("result-team-fr")}</div><div class="field${invalidClass("result-team-en")}"><label for="result-team-en">${a11y("Nom d’équipe (EN)", "Team name (EN)")}</label><input id="result-team-en" name="teamNameEn" value="${escapeHtml(draft.teamNameEn)}" aria-invalid="${Boolean(state.resultErrors["result-team-en"])}" />${fieldError("result-team-en")}</div>`
              : `<div class="field field-full${invalidClass("result-athlete")}"><label for="result-athlete">${labels[state.language].athlete}</label><select id="result-athlete" name="athlete" aria-invalid="${Boolean(state.resultErrors["result-athlete"])}">${data.athletes.map((athlete) => `<option value="${athlete.id}" ${draft.athlete === athlete.id ? "selected" : ""}>${local(athlete.name)}</option>`).join("")}</select>${fieldError("result-athlete")}</div>`
          }
          <div class="field${invalidClass("result-category-fr")}"><label for="result-category-fr">${isPoomsae ? a11y("Format / catégorie (FR)", "Format / category (FR)") : a11y("Catégorie de poids (FR)", "Weight category (FR)")}</label><input id="result-category-fr" name="categoryFr" value="${escapeHtml(draft.categoryFr)}" aria-invalid="${Boolean(state.resultErrors["result-category-fr"])}" />${fieldError("result-category-fr")}</div>
          <div class="field${invalidClass("result-category-en")}"><label for="result-category-en">${isPoomsae ? a11y("Format / catégorie (EN)", "Format / category (EN)") : a11y("Catégorie de poids (EN)", "Weight category (EN)")}</label><input id="result-category-en" name="categoryEn" value="${escapeHtml(draft.categoryEn)}" aria-invalid="${Boolean(state.resultErrors["result-category-en"])}" />${fieldError("result-category-en")}</div>
          <div class="field${invalidClass("result-rank")}"><label for="result-rank">${labels[state.language].rank}</label><input id="result-rank" name="rank" type="number" min="1" value="${escapeHtml(draft.rank)}" aria-invalid="${Boolean(state.resultErrors["result-rank"])}" />${fieldError("result-rank")}</div>
          <div class="field"><label for="result-medal">${a11y("Médaille", "Medal")}</label><select id="result-medal" name="medal">${["none", "gold", "silver", "bronze"].map((value) => `<option value="${value}" ${draft.medal === value ? "selected" : ""}>${medalName(value)}</option>`).join("")}</select></div>
          <div class="field field-full"><label for="result-comment-fr">${a11y("Commentaire (FR)", "Comment (FR)")}</label><textarea id="result-comment-fr" name="commentFr">${escapeHtml(draft.commentFr)}</textarea></div>
          <div class="field field-full"><label for="result-comment-en">${a11y("Commentaire (EN)", "Comment (EN)")}</label><textarea id="result-comment-en" name="commentEn">${escapeHtml(draft.commentEn)}</textarea></div>
          <div class="field field-full${invalidClass("result-source")}"><label for="result-source">${a11y("Source / justificatif", "Source / evidence")}</label><input id="result-source" name="source" value="${escapeHtml(draft.source)}" aria-invalid="${Boolean(state.resultErrors["result-source"])}" /><span class="field-help">${a11y("Référence fictive uniquement ; aucun fichier n’est envoyé.", "Fictional reference only; no file is uploaded.")}</span>${fieldError("result-source")}</div>
          <div class="field"><label for="result-status">${a11y("Statut", "Status")}</label><select id="result-status" name="status">${["draft", "published", "archived", "cancelled"].map((value) => `<option value="${value}" ${draft.status === value ? "selected" : ""}>${statusName(value)}</option>`).join("")}</select></div>
          <div class="field-full inline-actions"><button class="button button-primary" type="submit">${a11y("Vérifier les informations", "Review information")}</button><button class="button button-secondary" type="button" data-cancel-result="${mode}">${a11y("Annuler", "Cancel")}</button></div>
        </div>
      </form>
    `;
  }

  function renderAdminResultCreate() {
    return adminShell(
      `<p class="eyebrow">${a11y("Résultats", "Results")}</p><h1>${a11y("Créer un résultat", "Create a result")}</h1><p>${a11y("Tous les champs restent modifiables tant que l’enregistrement simulé n’est pas confirmé.", "All fields remain editable until the simulated save is confirmed.")}</p>${resultForm("create")}`,
      "admin-results",
    );
  }

  function renderAdminResultEdit() {
    const result = state.results.find((item) => item.id === state.selectedResultId);
    if (!result) return renderAdminResults();
    return adminShell(
      `<p class="eyebrow">${result.id}</p><h1>${a11y("Modifier le résultat", "Edit result")}</h1><p>${a11y("L’annulation revient à la fiche sans modifier l’état en mémoire.", "Cancelling returns to the detail without changing in-memory state.")}</p>${resultForm("edit")}`,
      "admin-results",
    );
  }

  function summaryRows(result) {
    return [
      [labels[state.language].competition, local(result.competition)],
      [labels[state.language].date, displayDate(result.date)],
      [labels[state.language].place, local(result.place)],
      [labels[state.language].discipline, disciplineName(result.discipline)],
      [a11y("Participation", "Participation"), resultParticipant(result)],
      [labels[state.language].category, local(result.category)],
      [labels[state.language].rank, result.rank],
      [a11y("Médaille", "Medal"), medalName(result.medal)],
      [a11y("Commentaire", "Comment"), local(result.comment) || "—"],
      [a11y("Source / justificatif", "Source / evidence"), result.source],
      [a11y("Statut", "Status"), statusName(result.status)],
    ];
  }

  function resultSummary(result) {
    return `<dl class="summary-list">${summaryRows(result).map(([term, value]) => `<div><dt>${term}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>`;
  }

  function renderResultConfirmation(mode) {
    const isEdit = mode === "edit";
    const existing = isEdit
      ? state.results.find((item) => item.id === state.selectedResultId)
      : null;
    const proposed = resultFromDraft(state.resultDraft, existing);
    let comparison = "";
    if (isEdit && state.editOriginal) {
      const before = resultFromDraft(state.editOriginal, existing);
      const changed = summaryRows(proposed).filter(
        ([, value], index) => String(value) !== String(summaryRows(before)[index][1]),
      );
      comparison = `<section class="admin-panel"><h2>${a11y("Changements détectés", "Detected changes")}</h2>${changed.length ? `<ul class="change-list">${changed.map(([term, value]) => `<li><strong>${term}</strong> → ${escapeHtml(value)}</li>`).join("")}</ul>` : `<p>${a11y("Aucun changement de valeur.", "No value changes.")}</p>`}</section>`;
    }
    return adminShell(
      `
        <p class="eyebrow">${a11y("Vérification", "Review")}</p>
        <h1>${isEdit ? a11y("Confirmer la modification", "Confirm changes") : a11y("Confirmer la création", "Confirm creation")}</h1>
        <p>${a11y("Relisez le récapitulatif complet avant l’enregistrement simulé.", "Review the complete summary before the simulated save.")}</p>
        <section class="admin-panel"><h2>${a11y("Récapitulatif complet", "Complete summary")}</h2>${resultSummary(proposed)}</section>
        ${comparison}
        <div class="inline-actions confirmation-actions"><button class="button button-secondary" type="button" data-edit-information="${mode}">${a11y("Modifier les informations", "Edit information")}</button><button class="button button-primary" type="button" data-confirm-result="${mode}">${a11y("Confirmer et enregistrer", "Confirm and save")}</button><button class="button button-ghost" type="button" data-cancel-result="${mode}">${a11y("Annuler", "Cancel")}</button></div>
      `,
      "admin-results",
    );
  }

  function renderAdminResultCreateConfirm() {
    return renderResultConfirmation("create");
  }

  function renderAdminResultEditConfirm() {
    return renderResultConfirmation("edit");
  }

  function currentResult() {
    return (
      state.results.find((item) => item.id === state.selectedResultId) ||
      state.results[0]
    );
  }

  function renderAdminResultDetail() {
    const result = currentResult();
    if (!result) return renderAdminResults();
    return adminShell(
      `
        ${
          ["empty", "missing", "error"].includes(state.viewState)
            ? stateOverride()
            : `
              ${state.resultNotice || state.viewState === "success" ? `<div class="notice notice-success" role="status" tabindex="-1" data-result-success><strong>${state.resultNotice || a11y("État de succès fictif.", "Fictional success state.")}</strong><br />${a11y("Le site public et le palmarès ont été recalculés sans duplication.", "The public site and honours were recalculated without duplication.")}</div>` : ""}
              <p class="eyebrow">${result.id}</p><h1>${a11y("Fiche résultat existant", "Existing result detail")}</h1>
              <div class="tag-row"><span class="status-badge ${statusClass(result.status)}">${statusName(result.status)}</span>${demoLabel()}</div>
              <section class="admin-panel">${resultSummary(result)}</section>
              <div class="inline-actions confirmation-actions"><button class="button button-primary" type="button" data-start-edit>${a11y("Modifier le résultat", "Edit result")}</button><button class="button button-secondary" type="button" data-screen="admin-result-history">${a11y("Voir l’historique", "View history")}</button><button class="button button-secondary" type="button" data-screen="admin-results">${a11y("Retour à la liste", "Back to list")}</button></div>
            `
        }
      `,
      "admin-results",
    );
  }

  function renderAdminResultHistory() {
    const result = currentResult();
    if (!result) return renderAdminResults();
    const history = result.history || [];
    return adminShell(
      `
        <p class="eyebrow">${result.id}</p><h1>${a11y("Historique du résultat", "Result history")}</h1>
        <p>${a11y("Journal fictif, neutre et local à la démonstration.", "Fictional, neutral log local to the demonstration.")}</p>
        <section class="admin-panel">
          <div class="timeline">${history.map((entry) => `<article class="event-row"><div class="event-date">${new Date(entry.at).toLocaleString(state.language === "fr" ? "fr-FR" : "en-GB")}</div><div><h2>${local(entry.action)}</h2><p>${entry.actor}</p></div><span class="status-badge status-review">${a11y("Fictif", "Fictional")}</span></article>`).join("")}</div>
        </section>
        <button class="button button-secondary" type="button" data-screen="admin-result-detail">${a11y("Retour à la fiche", "Back to detail")}</button>
      `,
      "admin-results",
    );
  }

  function permissionCell(value) {
    const yes = value === "edit";
    const view = value === "view";
    const label =
      state.language === "fr"
        ? yes
          ? "Modifier"
          : view
            ? "Voir"
            : "Aucun"
        : yes
          ? "Edit"
          : view
            ? "View"
            : "None";
    return `<td class="${yes ? "permission-yes" : view ? "" : "permission-no"}">${label}</td>`;
  }

  function renderAdminPermissions() {
    const rows = [
      [a11y("Compétitions et résultats", "Competitions and results"), "edit", "edit", "view", "view"],
      [a11y("Athlètes", "Athletes"), "edit", "edit", "view", "view"],
      [a11y("Actualités et événements", "News and events"), "edit", "view", "edit", "edit"],
      [a11y("Photos et vidéos", "Photos and videos"), "edit", "view", "edit", "edit"],
      [a11y("Accès et configuration", "Access and settings"), "edit", "none", "none", "none"],
    ];
    const accounts = [
      ["Compte Démo Principal", a11y("Administrateur principal", "Administrateur principal")],
      ["Compte Démo Sport A", a11y("Administrateur sportif", "Administrateur sportif")],
      ["Compte Démo Sport B", a11y("Administrateur sportif", "Administrateur sportif")],
      ["Compte Démo Éditorial", a11y("Administrateur éditorial", "Administrateur éditorial")],
      ["Compte Démo Contribution", a11y("Contributeur", "Contributeur")],
      ["Compte Démo Optionnel", a11y("Contributeur", "Contributeur")],
    ];
    return adminShell(
      `
        <p class="eyebrow">${state.language === "fr" ? "Accès" : "Access"}</p>
        <h1>${state.language === "fr" ? "Deux scénarios de permissions" : "Two permission scenarios"}</h1>
        ${stateOverride() || `
          <section class="admin-panel">
            <div class="tag-row"><span class="status-badge status-review">${state.language === "fr" ? "Scénario A · payant" : "Scenario A · paid"}</span></div>
            <h2>${state.language === "fr" ? "Decap Turbo avec rôles" : "Decap Turbo with roles"}</h2>
            <p>${state.language === "fr" ? "Coût indicatif : 38 €/mois pour 5 comptes ou 44 €/mois pour 6 comptes." : "Indicative cost: €38/month for 5 accounts or €44/month for 6 accounts."}</p>
            <div class="grid-2 account-grid">${accounts.map(([name, role], index) => `<article class="card"><strong>${name}</strong><br /><span>${role}</span>${index === 5 ? `<br /><small>${a11y("6e compte optionnel", "Optional 6th account")}</small>` : ""}</article>`).join("")}</div>
            <div class="permission-table-wrap">
              <table class="permission-table">
                <caption>${state.language === "fr" ? "Matrice fictive des droits par collection" : "Fictional collection permission matrix"}</caption>
                <thead>
                  <tr>
                    ${[
                      state.language === "fr" ? "Collection" : "Collection",
                      "Administrateur principal",
                      "Administrateur sportif",
                      "Administrateur éditorial",
                      "Contributeur",
                    ]
                      .map((value) => `<th scope="col">${value}</th>`)
                      .join("")}
                  </tr>
                </thead>
                <tbody>
                  ${rows
                    .map(
                      ([name, ...permissions]) =>
                        `<tr><th scope="row">${name}</th>${permissions.map(permissionCell).join("")}</tr>`,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <div class="notice notice-warning">${state.language === "fr" ? "Les droits disponibles sont edit / view / none par collection. Ils ne séparent pas finement publier de supprimer." : "Available collection rights are edit / view / none. They do not finely separate publishing from deletion."}</div>
          </section>
          <section class="admin-panel">
            <div class="tag-row"><span class="status-badge status-draft">${state.language === "fr" ? "Scénario B · gratuit" : "Scenario B · free"}</span></div>
            <h2>Pages CMS</h2>
            <p>${state.language === "fr" ? "Comptes individuels et GitHub App, mais sans rôles métier fins ni restrictions fiables par collection." : "Individual accounts and GitHub App, but no fine-grained business roles or reliable collection restrictions."}</p>
            <ul>
              <li>${state.language === "fr" ? "Rôles affichés comme consignes, non comme barrières techniques." : "Displayed roles are guidance, not technical barriers."}</li>
              <li>${state.language === "fr" ? "Pas de workflow éditorial natif comparable." : "No comparable native editorial workflow."}</li>
              <li>${state.language === "fr" ? "MFA organisationnelle non documentée." : "Organisation-wide MFA not documented."}</li>
            </ul>
          </section>
        `}
      `,
      "admin-permissions",
    );
  }

  function renderUtility() {
    const title =
      state.viewState === "missing"
        ? ui().missingTitle
        : state.language === "fr"
          ? "Page non trouvée"
          : "Page not found";
    const body =
      state.viewState === "missing"
        ? ui().missingText
        : state.language === "fr"
          ? "Cette page fictive montre un état 404 clair et une action de retour."
          : "This fictional page shows a clear 404 state and a return action.";
    return publicShell(`
      <section class="section">
        <div class="site-container">
          <div class="state-panel">
            <span class="state-code">${state.viewState === "missing" ? (state.language === "fr" ? "EN" : "FR") : "404"}</span>
            ${demoLabel()}
            <h1>${title}</h1>
            <p>${body}</p>
            ${pageLink("home", ui().nav.home, "button button-primary")}
          </div>
        </div>
      </section>
    `);
  }

  const renderers = {
    home: renderHome,
    club: renderClub,
    disciplines: renderDisciplines,
    kyorugi: renderKyorugi,
    poomsae: renderPoomsae,
    athletes: renderAthletes,
    athlete: renderAthlete,
    competitions: renderCompetitions,
    results: renderResults,
    honours: renderHonours,
    competition: renderCompetition,
    calendar: renderCalendar,
    news: renderNews,
    media: renderMedia,
    contact: renderContact,
    "admin-login": renderAdminLogin,
    "admin-dashboard": renderAdminDashboard,
    "admin-editor": renderAdminEditor,
    "admin-contents": renderAdminContents,
    "admin-athletes": renderAdminAthletes,
    "admin-competitions": renderAdminCompetitions,
    "admin-results": renderAdminResults,
    "admin-result-create": renderAdminResultCreate,
    "admin-result-create-confirm": renderAdminResultCreateConfirm,
    "admin-result-detail": renderAdminResultDetail,
    "admin-result-edit": renderAdminResultEdit,
    "admin-result-edit-confirm": renderAdminResultEditConfirm,
    "admin-result-history": renderAdminResultHistory,
    "admin-permissions": renderAdminPermissions,
    utility: renderUtility,
  };

  function allowedViewStates() {
    if (state.screen === "contact") {
      return ["default", "error", "success"];
    }
    if (state.screen === "utility") {
      return ["default", "missing"];
    }
    if (["admin-results", "admin-result-detail"].includes(state.screen)) {
      return ["default", "empty", "missing", "error", "success"];
    }
    if (
      [
        "admin-editor",
        "admin-result-create",
        "admin-result-create-confirm",
        "admin-result-detail",
        "admin-result-edit",
        "admin-result-edit-confirm",
        "admin-result-history",
      ].includes(state.screen)
    ) {
      return ["default", "error"];
    }
    if (state.screen === "admin-login") {
      return ["default"];
    }
    return ["default", "empty", "missing", "error"];
  }

  function syncStateOptions() {
    const allowed = allowedViewStates();
    if (!allowed.includes(state.viewState)) {
      state.viewState = "default";
    }
    Array.from(stateSelect.options).forEach((option) => {
      option.disabled = !allowed.includes(option.value);
    });
  }

  function announce() {
    const screenLabel =
      screenSelect.options[screenSelect.selectedIndex]?.text || state.screen;
    statusRegion.textContent =
      state.language === "fr"
        ? `Maquette ${screenLabel}, langue ${ui().language}, état ${state.viewState}.`
        : `${screenLabel} mockup, ${ui().language}, ${state.viewState} state.`;
  }

  function updateDialogCopy() {
    mediaDialog.querySelector(".dialog-visual span").textContent =
      state.language === "fr"
        ? "Emplacement média autorisé"
        : "Approved media placeholder";
    mediaDialog.querySelector("[data-dialog-title]").textContent =
      state.language === "fr"
        ? "Aperçu média fictif"
        : "Fictional media preview";
    mediaDialog.querySelector("[data-dialog-copy]").textContent =
      state.language === "fr"
        ? "Cette forme remplace une photographie. Aucun portrait ou contenu social n’est utilisé."
        : "This shape replaces a photograph. No portrait or social content is used.";
    mediaDialog.querySelector("[data-dialog-close]").textContent =
      state.language === "fr" ? "Fermer" : "Close";
  }

  function syncHash() {
    const value = `${state.screen}/${state.language}/${state.viewState}/${state.viewport}`;
    if (window.location.hash.slice(1) !== value) {
      window.history.replaceState(null, "", `#${value}`);
    }
  }

  function render() {
    syncStateOptions();
    document.documentElement.lang = state.language;
    screenSelect.value = state.screen;
    languageSelect.value = state.language;
    viewportSelect.value = state.viewport;
    stateSelect.value = state.viewState;
    annotationToggle.checked = state.annotations;

    frame.className = `prototype-frame viewport-${state.viewport}${
      state.annotations ? " show-annotations" : ""
    }`;

    const renderer = renderers[state.screen] || renderHome;
    root.innerHTML = renderer();
    updateDialogCopy();
    syncHash();
    announce();
  }

  function setScreen(screen) {
    if (!renderers[screen]) return;
    state.screen = screen;
    state.viewState = "default";
    render();
    root.querySelector("#prototype-main")?.focus({ preventScroll: true });
  }

  function changeLanguage() {
    state.language = state.language === "fr" ? "en" : "fr";
    render();
  }

  function parseHash() {
    const [screen, language, viewState, viewport] = window.location.hash
      .slice(1)
      .split("/");
    if (renderers[screen]) state.screen = screen;
    if (["fr", "en"].includes(language)) state.language = language;
    if (["default", "empty", "missing", "error", "success"].includes(viewState)) {
      state.viewState = viewState;
    }
    if (
      ["fluid", "desktop", "tablet", "mobile", "small-mobile"].includes(
        viewport,
      )
    ) {
      state.viewport = viewport;
    }
  }

  function updateDraftFromForm(form) {
    const formData = new FormData(form);
    [
      "competitionId",
      "date",
      "placeFr",
      "placeEn",
      "discipline",
      "participantType",
      "athlete",
      "teamNameFr",
      "teamNameEn",
      "categoryFr",
      "categoryEn",
      "rank",
      "medal",
      "commentFr",
      "commentEn",
      "source",
      "status",
    ].forEach((name) => {
      if (formData.has(name)) {
        state.resultDraft[name] = String(formData.get(name) || "");
      }
    });
    const competition = data.competitions.find(
      (item) => item.id === state.resultDraft.competitionId,
    );
    if (competition) {
      state.resultDraft.competitionFr = competition.title.fr;
      state.resultDraft.competitionEn = competition.title.en;
    }
  }

  function validateResultDraft() {
    const draft = state.resultDraft;
    const errors = {};
    const required = a11y("Champ requis.", "Required field.");
    if (!draft.competitionId) errors["result-competition"] = required;
    if (!draft.date) errors["result-date"] = required;
    if (!draft.placeFr.trim()) errors["result-place-fr"] = required;
    if (!draft.placeEn.trim()) errors["result-place-en"] = required;
    if (draft.participantType === "team" || draft.participantType === "pair") {
      if (!draft.teamNameFr.trim()) errors["result-team-fr"] = required;
      if (!draft.teamNameEn.trim()) errors["result-team-en"] = required;
    } else if (!draft.athlete) {
      errors["result-athlete"] = required;
    }
    if (!draft.categoryFr.trim()) errors["result-category-fr"] = required;
    if (!draft.categoryEn.trim()) errors["result-category-en"] = required;
    const minimumRank = draft.status === "cancelled" ? 0 : 1;
    if (
      !Number.isInteger(Number(draft.rank)) ||
      Number(draft.rank) < minimumRank
    ) {
      errors["result-rank"] = a11y(
        `Saisissez un rang entier supérieur ou égal à ${minimumRank}.`,
        `Enter an integer rank of ${minimumRank} or more.`,
      );
    }
    if (!draft.source.trim()) errors["result-source"] = required;
    state.resultErrors = errors;
    return Object.keys(errors).length === 0;
  }

  function nextResultId() {
    const max = state.results.reduce((current, result) => {
      const number = Number(result.id.match(/(\d+)$/)?.[1] || 0);
      return Math.max(current, number);
    }, 0);
    return `demo-result-${String(max + 1).padStart(3, "0")}`;
  }

  function saveConfirmedResult(mode) {
    const existing =
      mode === "edit"
        ? state.results.find((item) => item.id === state.selectedResultId)
        : null;
    const saved = resultFromDraft(state.resultDraft, existing);
    if (existing) {
      saved.id = existing.id;
      saved.history.push({
        at: saved.updatedAt,
        action: {
          fr: "Modification fictive enregistrée",
          en: "Fictional update saved",
        },
        actor: "Compte Démo Sport",
      });
      state.results = state.results.map((item) =>
        item.id === saved.id ? saved : item,
      );
      state.resultNotice = a11y(
        "Modification simulée enregistrée.",
        "Simulated changes saved.",
      );
    } else {
      saved.id = nextResultId();
      saved.history.push({
        at: saved.createdAt,
        action: {
          fr: "Création fictive enregistrée",
          en: "Fictional creation saved",
        },
        actor: "Compte Démo Sport",
      });
      state.results = [...state.results, saved];
      state.resultNotice = a11y(
        "Création simulée enregistrée.",
        "Simulated creation saved.",
      );
    }
    state.selectedResultId = saved.id;
    state.resultErrors = {};
    state.editOriginal = null;
    state.screen = "admin-result-detail";
    state.viewState = "default";
    render();
    root.querySelector("[data-result-success]")?.focus();
  }

  screenSelect.addEventListener("change", () => {
    state.screen = screenSelect.value;
    state.viewState = "default";
    render();
  });

  languageSelect.addEventListener("change", () => {
    state.language = languageSelect.value;
    render();
  });

  viewportSelect.addEventListener("change", () => {
    state.viewport = viewportSelect.value;
    render();
  });

  stateSelect.addEventListener("change", () => {
    state.viewState = stateSelect.value;
    render();
  });

  annotationToggle.addEventListener("change", () => {
    state.annotations = annotationToggle.checked;
    render();
  });

  document.addEventListener("click", (event) => {
    const screenTarget = event.target.closest("[data-screen]");
    if (screenTarget) {
      event.preventDefault();
      setScreen(screenTarget.dataset.screen);
      return;
    }

    if (event.target.closest("[data-start-create]")) {
      state.resultDraft = blankResult();
      state.resultErrors = {};
      state.resultNotice = "";
      setScreen("admin-result-create");
      return;
    }

    const openResult = event.target.closest("[data-open-result]");
    if (openResult) {
      state.selectedResultId = openResult.dataset.openResult;
      state.resultNotice = "";
      setScreen("admin-result-detail");
      return;
    }

    if (event.target.closest("[data-start-edit]")) {
      const result = currentResult();
      state.resultDraft = draftFromResult(result);
      state.editOriginal = JSON.parse(JSON.stringify(state.resultDraft));
      state.resultErrors = {};
      state.resultNotice = "";
      setScreen("admin-result-edit");
      return;
    }

    const editInformation = event.target.closest("[data-edit-information]");
    if (editInformation) {
      setScreen(
        editInformation.dataset.editInformation === "edit"
          ? "admin-result-edit"
          : "admin-result-create",
      );
      return;
    }

    const cancelResult = event.target.closest("[data-cancel-result]");
    if (cancelResult) {
      state.resultErrors = {};
      if (cancelResult.dataset.cancelResult === "edit") {
        state.editOriginal = null;
        setScreen("admin-result-detail");
      } else {
        setScreen("admin-results");
      }
      return;
    }

    const confirmResult = event.target.closest("[data-confirm-result]");
    if (confirmResult) {
      saveConfirmedResult(confirmResult.dataset.confirmResult);
      return;
    }

    if (event.target.closest("[data-switch-language]")) {
      changeLanguage();
      return;
    }

    const menuButton = event.target.closest("[data-menu-toggle]");
    if (menuButton) {
      const header = menuButton.closest("[data-site-header]");
      const isOpen = header.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    const openDialog = event.target.closest("[data-open-dialog]");
    if (openDialog) {
      lastDialogTrigger = openDialog;
      mediaDialog.showModal();
      return;
    }

    if (event.target.closest("[data-close-dialog]")) {
      mediaDialog.close();
      return;
    }

    const videoButton = event.target.closest("[data-load-video]");
    if (videoButton) {
      const screen = videoButton.closest("[data-video-screen]");
      screen.innerHTML = `<p role="status">${state.language === "fr" ? "Lecteur fictif chargé. Aucune connexion à YouTube." : "Fictional player loaded. No YouTube connection."}</p>`;
      return;
    }

    if (event.target.closest("[data-reset-state]")) {
      state.viewState = "default";
      render();
      return;
    }

    const tab = event.target.closest("[data-language-tab]");
    if (tab) {
      const tabs = tab.parentElement.querySelectorAll("[data-language-tab]");
      tabs.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === tab)),
      );
      const panel = tab.closest(".admin-panel").querySelector(
        "[data-translation-panel]",
      );
      const isEnglish = tab.dataset.languageTab === "en";
      panel.innerHTML = `
        <h2>${isEnglish ? "English copy" : "Texte français"}</h2>
        <div class="field">
          <label for="admin-title-active">${isEnglish ? "Title" : "Titre"}</label>
          <input id="admin-title-active" value="${isEnglish ? "Horizon Demonstration Tournament" : "Tournoi Démonstration Horizon"}" />
        </div>
        <div class="field">
          <label for="admin-summary-active">${isEnglish ? "Summary" : "Résumé"}</label>
          <textarea id="admin-summary-active">${isEnglish ? "Clearly labelled fictional content." : "Contenu fictif clairement signalé."}</textarea>
        </div>
      `;
    }
  });

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-result-adaptive]")) return;
    const form = event.target.closest("[data-result-form]");
    if (!form) return;
    const focusedId = event.target.id;
    updateDraftFromForm(form);
    render();
    root.querySelector(`#${focusedId}`)?.focus();
  });

  document.addEventListener("submit", (event) => {
    if (event.target.matches("[data-result-form]")) {
      event.preventDefault();
      const mode = event.target.dataset.resultForm;
      updateDraftFromForm(event.target);
      if (!validateResultDraft()) {
        render();
        root.querySelector("[data-result-error-summary]")?.focus();
        statusRegion.textContent = a11y(
          "Le formulaire contient des erreurs. Les données sont conservées.",
          "The form contains errors. Data has been preserved.",
        );
        return;
      }
      state.screen =
        mode === "edit"
          ? "admin-result-edit-confirm"
          : "admin-result-create-confirm";
      state.viewState = "default";
      render();
      root.querySelector("#prototype-main")?.focus({ preventScroll: true });
      return;
    }

    if (event.target.matches("[data-demo-form]")) {
      event.preventDefault();
      statusRegion.textContent =
        state.language === "fr"
          ? "Filtres de démonstration appliqués."
          : "Demonstration filters applied.";
    }

    if (event.target.matches("[data-contact-form]")) {
      event.preventDefault();
      const formData = new FormData(event.target);
      state.contactValues = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        subject: String(formData.get("subject") || "general"),
        message: String(formData.get("message") || ""),
        privacy: false,
      };
      const valid =
        state.contactValues.email.includes("@") &&
        state.contactValues.message.trim().length > 4;
      state.viewState = valid ? "success" : "error";
      render();
      root
        .querySelector(valid ? '[role="status"]' : "[data-error-summary]")
        ?.focus?.();
    }
  });

  mediaDialog.addEventListener("close", () => {
    lastDialogTrigger?.focus();
    lastDialogTrigger = null;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || mediaDialog.open) return;
    const openHeader = root.querySelector(".site-header.nav-open");
    if (openHeader) {
      openHeader.classList.remove("nav-open");
      const trigger = openHeader.querySelector("[data-menu-toggle]");
      trigger?.setAttribute("aria-expanded", "false");
      trigger?.focus();
    }
  });

  window.addEventListener("hashchange", () => {
    parseHash();
    render();
  });

  parseHash();
  render();
})();
