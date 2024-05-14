import requests
import json
from solar.views.fetch_api_date import fetch_api_data
import pandas as pd
import random


class SolarProductionService:

    def calculate_charging_recommendations(self, battery_level):
        """Calculate charging recommendations based on the Tesla battery level."""
        if battery_level < 5:
            # If the battery is critically low, advise against charging to prevent damage
            return {
                "recommendation": "Avoid charging, battery too low.",
                "charge_target": 0
            }
        elif battery_level >= 105:
            # This case should ideally not occur, as it might indicate an error in reading
            return {
                "recommendation": "Check system, reading error suspected (battery level too high).",
                "charge_target": 100
            }
        else:
            # Calculate the charge needed to reach up to 95% capacity
            needed_charge = 95 - battery_level
            if needed_charge > 0:
                return {
                    "recommendation": f"Charge up to {needed_charge}% to reach 95% capacity.",
                    "charge_target": 95
                }
            else:
                # If no charging is needed
                return {
                    "recommendation": "Battery is optimally charged. No additional charging recommended.",
                    "charge_target": battery_level
                }

    def get_solar_production_data(self):
        solar_production_url = 'https://data.fingrid.fi/api/datasets/74/data?format=json&page=1&pageSize=100'

        # Fetch the production data from the API
        solar_production_data = fetch_api_data(solar_production_url)

        # Scaling factor for household usage
        scaling_factor = 1 / 10

        # Apply the scaling factor to the production values
        if 'data' in solar_production_data:
            for entry in solar_production_data['data']:
                entry['value'] *= scaling_factor

        # Save the scaled data to a JSON file
        with open('solar/assets/solar_production_data.json', 'w') as file:
            json.dump(solar_production_data, file, indent=4)

        # Return the scaled data
        return solar_production_data['data']

    def get_charging_prices_data(self):
        df = pd.read_excel('solar/assets/charging_prices.xlsx')

        # Set the index to be a range of integers representing the row numbers
        df.index = range(len(df))
        df = df.iloc[:-3]
        df = df.rename(columns={'Delivery period (EET)': 'time_duration'})
        df = df = df.rename(columns=lambda x: x.lower().replace(
            ' ', '_').replace('(', '').replace(')', ''))

        data_dict = df.to_dict(orient='records')
        with open('solar/assets/charging_prices_data.json', 'w') as file:
            json.dump(data_dict, file, indent=4)

        return data_dict

    
    def get_battery_level(self):
        battery_level = random.randint(1, 106)

        return battery_level