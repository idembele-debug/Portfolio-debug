<div class="overlay" id="about-overlay">
    <button class="close-btn" onclick="closeAbout()">{{ __('portfolio.ui.close') }}</button>

    <div class="about-inner">
        <div class="section-label"><span></span> A PROPOS DE MOI</div>

        <div class="about-grid">

            <div class="photo-frame">
                <div style="position:relative">
                    <div class="photo-deco"></div>
                    <div class="photo-deco2"></div>
                    <div class="photo-container">
                        <img
                            src="{{ asset('images/issaphoto.JPG') }}"
                            alt="Issa D. Dembele Engineering Student"
                            loading="lazy"
                        >
                        <div class="photo-overlay">
                            <div class="photo-caption">
                                <strong>Issa D. DEMBELE</strong>
                                Etudiant en Ingénieurie · Casablanca
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="about-content">
                <p class="about-section-label">Qui suis-je ?</p>
                <h2 class="about-name">Issa D. DEMBELE</h2>
                <p class="about-title">
                    Cycle Ingénieur d'État Informatique &amp; Intelligence Artificielle à HESTIM
                </p>

                <div class="about-bio">
                    <p>
                        Étudiant en 1ère année du cycle ingénieur d'État en Informatique et Intelligence
                        Artificielle à l'École HESTIM de Casablanca. Originaire du Mali 🇲🇱, passionné
                        par le développement logiciel et l'Intelligence Artificielle.
                    </p>
                    <p>
                        Curieux, motivé et rigoureux, je m'engage dans chaque projet avec sens du
                        détail et capacité d'adaptation. Membre actif du club
                        <strong>Rotaract HESTIM</strong>, je crois en l'impact positif de la technologie.
                    </p>
                </div>

                <div class="info-grid">
                    <div class="info-card">
                        <div class="label">Email</div>
                        <div class="value">
                            <a href="mailto:i.dembele@hestim.ma">i.dembele@hestim.ma</a>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="label">Phone</div>
                        <div class="value">+212-690-611-402</div>
                    </div>
                    <div class="info-card">
                        <div class="label">Location</div>
                        <div class="value">Casablanca, Maroc 🇲🇦</div>
                    </div>
                    <div class="info-card">
                        <div class="label">LinkedIn</div>
                        <div class="value">
                            <a href="https://www.linkedin.com/in/issa-d-dembele-a46a34356/" target="_blank" rel="noopener">
                                ISSA D DEMBELE
                            </a>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="label">Languages</div>
                        <div class="value">Français &amp; Anglais</div>
                    </div>
                    <div class="info-card">
                        <div class="label">Status</div>
                        <div class="value" style="color:var(--green)">Ouvert pour le stage</div>
                    </div>
                </div>

                <div class="skills-block">
                    <p class="block-title">Languages &amp; Frameworks</p>
                    <div class="skill-tags">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">Flask</span>
                        <span class="skill-tag">PHP</span>
                        <span class="skill-tag">Laravel</span>
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">Langage C</span>
                        <span class="skill-tag">Java</span>
                        <span class="skill-tag">HTML</span>
                        <span class="skill-tag">CSS</span>
                    </div>
                </div>

                <div class="skills-block">
                    <p class="block-title">Outils</p>
                    <div class="skill-tags">
                        <span class="skill-tag">VS Code</span>
                        <span class="skill-tag">Postman</span>
                        <span class="skill-tag">MySQL</span>
                        <span class="skill-tag">Word</span>
                        <span class="skill-tag">Excel</span>
                        <span class="skill-tag">GitHub</span>
                    </div>
                </div>

                <div class="skills-block">
                    <p class="block-title">Compétences douces</p>
                    <div class="skill-tags">
                        <span class="skill-tag">Communication efficace</span>
                        <span class="skill-tag">Capacité d'adaptation</span>
                        <span class="skill-tag">Sens du détail</span>
                        <span class="skill-tag">Curiosité</span>
                    </div>
                </div>

                <div class="about-ctas">
                    <button class="btn-primary" onclick="downloadCV()">
                        {{ __('portfolio.ui.download_cv') }}
                    </button>
                    <button class="btn-outline" onclick="openContact()">
                        {{ __('portfolio.ui.contact_me') }}
                    </button>
                </div>

                <div class="histoire-teaser" onclick="openHistoire()">
                    <div class="tease-label">Mon histoire Passé, Présent &amp; Futur</div>
                    <div class="tease-title">Plus qu'un étudiant en informatique</div>
                    <div class="tease-excerpt">
                        Né au Mali, passionné par le dessin puis le football, blessé, résilient…
                        Une trajectoire de vie qui m'a conduit jusqu'à Casablanca et à l'ingénierie.
                        Chaque étape a forgé qui je suis aujourd'hui.
                    </div>
                    <div class="tease-cta">Lire mon histoire complète</div>
                </div>

            </div>
        </div>
    </div>
</div>