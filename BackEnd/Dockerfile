FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia a solução e o csproj
COPY BackEnd.sln ./
COPY SistemaFinanceiroApi.csproj ./

# Restaura as dependências
RUN dotnet restore SistemaFinanceiroApi.csproj

# Copia o restante do projeto
COPY . .

# Muda para o diretório correto onde o .csproj está
WORKDIR /src

# Publica o projeto
RUN dotnet publish SistemaFinanceiroApi.csproj -c Release -o /app/publish

# ============================
# Runtime
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "SistemaFinanceiroApi.dll"]
