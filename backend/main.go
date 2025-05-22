package main

import (
	"proyecto-gym/app"
	"proyecto-gym/database"
)

func main() {
	DB.StartDbEngine()
	app.StartRoute()
}
