package main

import (
	"Proyecto-gym/app"
	"Proyecto-gym/database"
)

func main() {
	database.StartDbEngine()
	app.StartRoute()
}
