# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /server
COPY server.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /out

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .
RUN mkdir -p /app/images
EXPOSE 8080
ENTRYPOINT ["dotnet", "server.dll"]
