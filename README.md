# TrainingLog

En treningsdagbok-API med Docker og database


### Teknisk stack

- **Backend:** ASP.NET Core Web API (.NET 8)
- **Database:** PostgreSQL (kjøres i Docker)
- **ORM:** Entity Framework Core
- **Container:** Docker + Docker Compose
- **Frontend (valgfritt, dag 3):** React + Vite (TypeScript)
- **API-docs:** Swagger (Swashbuckle)



##### Starte prosjektet
Første terminal
```Bash
docker compose up -d db
dotnet ef database update
docker compose up --build
```

Andre terminal
```Shell
C:/GitHub/TrainingLog/dotnet run
```

Visual Studio Code
```Shell
npm run dev
```


Her er et screenshot av appen hostet lokalt, med CRUD metodene implementert i frontend.
<img width="959" height="599" alt="image" src="https://github.com/user-attachments/assets/6c106b37-0b7e-42c5-be8b-b4e6471e9b84" />
Edit og delete tar inn dataene til workouten som trykkes på i tabellen. 




Her er et screenshot av swagger etter post, put, delete og get har blitt kjørt.
<img width="1615" height="1045" alt="image" src="https://github.com/user-attachments/assets/f68bada4-19ba-461e-ba2e-0d28dcdd251f" />

<br>

## AI-bruk og refleksjon

Dette prosjektet ble utviklet med bevisst bruk av AI-verktøy som støtte for læring — ikke som erstatning for det.

#### Idé og planlegging — ChatGPT
Prosjektet startet med en åpen samtale med ChatGPT om hvilke prosjekter som egnet seg for å lære backend-utvikling. Valget falt på en treningsdagbok fordi det ga et naturlig domeneoppsett med CRUD-operasjoner og relasjonell data. ChatGPT hjalp deretter med å definere prosjektstruktur, hvilke lag som burde finnes (controllers, models, DTOs, DbContext), og hva som er vanlig praksis i .NET Web API-prosjekter.

#### Boilerplates med bevisste hull
For å sikre at jeg faktisk lærte implementasjonsdetaljene ba jeg ChatGPT generere klasser med metodesignaturer og TODO-kommentarer — uten ferdig logikk. Selve implementasjonen av CRUD-metodene, DTO-mapping og databaseintegrasjon ble skrevet av meg selv.

#### Konseptforståelse
Jeg brukte ChatGPT til å forstå hvordan PostgreSQL kan kjøres lokalt via Docker, og hvordan Entity Framework Core kobler seg til databasen fra .NET. Dette ga meg konseptuell forståelse før jeg gikk inn i koden, fremfor å kopiere løsninger jeg ikke forstod.

#### Kodereview med GitHub Copilot
Etter at prosjektet var ferdig gjennomgikk jeg koden med GitHub Copilot og ba den identifisere svakheter og forbedringsområder — men eksplisitt ikke fikse dem. Målet var å bruke AI som en erfaren reviewer, og selv ta stilling til hvilke endringer som burde gjøres og hvorfor.

#### Læringsfilosofi
AI ble brukt som sparringspartner og læringsstøtte, ikke som kodegenerator. Alle implementasjonsbeslutninger ble tatt og forstått av meg.

<br>

### Noe å legge merke til

Lite sikkerhets triks for enkel passordlagring. <br>
Legge til environment variables i .env i tillegg til å ha .env i .gitignore. 

docker-compose.yml

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
  	  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
  	  POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "5000:8080"
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      ConnectionStrings__Default: "Host=db;Port=5432;Database=traininglog;Username=traininguser;Password=trainingpass"
    depends_on:
      - db

volumes:
  pgdata:
```

<br>

### Videre plan – Frontend

Lag én side med:

- Liste over alle treningsøkter (GET)
- Et skjema for å legge til ny økt (POST)
- Slett-knapp per økt (DELETE)

Husk CORS i `Program.cs` siden frontend og API kjører på ulike porter.

<br>

### Mappestruktur når ferdig

```
TrainingLog/
├── Controllers/
│   └── WorkoutSessionsController.cs
├── Data/
│   └── AppDbContext.cs
├── Models/
│   └── WorkoutSession.cs
├── DTOs/
│   ├── CreateWorkoutSessionDto.cs
│   └── WorkoutSessionResponseDto.cs
├── Migrations/
├── docker-compose.yml
├── Dockerfile
└── Program.cs
```

<br>

### Hele flyten
Arbeidet fra dette programmet fungerer slik:
Client -> HTTP Request -> Routing -> Controller(CRUD) -> DbContext(EF Core) -> Database
1. Klient sender request
2. Controller mottar
3. db snakker med databasen med EF Core
4. Resultat returneres som DTO (Data Transfer Object)
5. JSON sendes tilbake

### Viktige konsepter
Her brukes det mange profesjonelle backend-konsepter:
* REST API
* CRUD
- async/await
- dependency injection
- Entity Framework Core
	- Dette som bruker ORM for å kunne jobbe med databaser som vanlige C#-objekter og ungp manuell SQL kode.
- DTO pattern
- routing
- HTTP status codes
- ORM (Object Relational Mapper)
- controller architecture


### Her er komandoer for prosjektet

##### Docker
```Bash
// Dette starter PostgreSQL-containeren. 
docker compose up db -d

// Starter db (PostgreSQL) og api (C# backend)
docker compose up --build

// Kjører ned docker containeren
docker compose down

// Kjører ned og sletter databasen
docker compose down -v
```


