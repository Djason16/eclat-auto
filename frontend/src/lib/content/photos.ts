import type { CategoryId } from '#lib/types.js'

/*
 * Photos of the site (static/images): free photos of Wikimedia Commons, resized, blurred and darkened like the blurred
 * pictures of the original design (adaptations shared under the same license). No photo of the original client is used.
 * Each one is a background picture (decorative): the text over it says everything. Every photo is used in one place
 * only (npm run check:images fails otherwise); the pages without a photo of their own (sign-in, error, admin) get the
 * dark-to-gold veil alone.
 */
export const PHOTOS = {
    heroHome: '/images/hero-home.webp',
    heroServices: '/images/hero-services.webp',
    heroBooking: '/images/hero-booking.webp',
    heroPros: '/images/hero-pros.webp',
    heroAccess: '/images/hero-access.webp',
    heroContact: '/images/hero-contact.webp',
    heroAccount: '/images/hero-account.webp',
    infoExtras: '/images/info-extras.webp',
    infoHomePros: '/images/info-home-pros.webp',
    infoBooking: '/images/info-booking.webp',
    infoContact: '/images/info-contact.webp',
    infoAccount: '/images/info-account.webp',
    infoPros: '/images/info-pros.webp',
    infoAccess: '/images/info-access.webp',
    offerDealers: '/images/offer-dealers.webp',
    offerVans: '/images/offer-vans.webp',
    offerCompanies: '/images/offer-companies.webp',
    // Sharp photo (not blurred) of the before / after slider of the home page
    beforeAfter: '/images/before-after.webp',
} as const

// One picture per service card of the home page, in the order of the services of each category
export const CATEGORY_PHOTOS: Record<CategoryId, string[]> = {
    interior: ['/images/interior-1.webp', '/images/interior-2.webp', '/images/interior-3.webp'],
    complete: ['/images/complete-1.webp', '/images/complete-2.webp', '/images/complete-3.webp'],
    polish: ['/images/polish-1.webp', '/images/polish-2.webp', '/images/polish-3.webp'],
    windshield: ['/images/windshield-1.webp', '/images/windshield-2.webp'],
}

// Credits of the photos (legal notice), one per picture of the site: title on Wikimedia Commons, author and license
export const PHOTO_CREDITS = [
    { title: 'Water sprays from a power washer onto a black car as steam rises, highlighting the cleaning process (image de partage)', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Water_sprays_from_a_power_washer_onto_a_black_car_as_steam_rises,_highlighting_the_cleaning_process.jpg' },
    { title: 'Close view of a car headlight with condensation on a black vehicle parked', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Close_view_of_a_car_headlight_with_condensation_on_a_black_vehicle_parked.jpg' },
    { title: 'Virino lavas la aŭton Honda CR-V en aŭtolavejo (Tjumeno)', author: 'RG72', license: 'CC BY 4.0', url: 'https://commons.wikimedia.org/wiki/File:Virino_lavas_la_a%C5%ADton_Honda_CR-V_en_a%C5%ADtolavejo_(Tjumeno).jpg' },
    { title: 'Aktivschaum', author: '3268zauber', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Aktivschaum.JPG' },
    { title: 'A car is being detailed with high-pressure water spray at a car wash location. The weather is rainy, creating a wet environment that enhances the washing process', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:A_car_is_being_detailed_with_high-pressure_water_spray_at_a_car_wash_location._The_weather_is_rainy,_creating_a_wet_environment_that_enhances_the_washing_process.jpg' },
    { title: 'A row of neatly shaped trees stands along a serene parking lot', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:A_row_of_neatly_shaped_trees_stands_along_a_serene_parking_lot.jpg' },
    { title: 'Car headlights illuminated with raindrops on a rainy day in an urban environment', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Car_headlights_illuminated_with_raindrops_on_a_rainy_day_in_an_urban_environment.jpg' },
    { title: 'Car interior close-up with dashboard controls and charging cable at night', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Car_interior_close-up_with_dashboard_controls_and_charging_cable_at_night.jpg' },
    { title: 'Interior of a car showcasing the gear shift and dashboard controls', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Interior_of_a_car_showcasing_the_gear_shift_and_dashboard_controls.jpg' },
    { title: 'Raindrops on a well-polished car roof', author: 'Kotivalo', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Raindrops_on_a_well-polished_car_roof.jpg' },
    { title: 'Fleet of white campus shuttle vans at the OAU transport park', author: 'Eminence190', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Fleet_of_white_campus_shuttle_vans_at_the_OAU_transport_park.jpg' },
    { title: 'A person operates a pressure washer to clean a black car, surrounded by bright sunlight at an outdoor car wash', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:A_person_operates_a_pressure_washer_to_clean_a_black_car,_surrounded_by_bright_sunlight_at_an_outdoor_car_wash.jpg' },
    { title: 'Wipers clear rain from a blue car as droplets cling to the windshield in a green environment', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Wipers_clear_rain_from_a_blue_car_as_droplets_cling_to_the_windshield_in_a_green_environment.jpg' },
    { title: 'Interior of a car showing a ceiling light and a rearview mirror in low light conditions', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Interior_of_a_car_showing_a_ceiling_light_and_a_rearview_mirror_in_low_light_conditions.jpg' },
    { title: 'Close-up view of a sophisticated car headlight reveals intricate components and reflections', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Close-up_view_of_a_sophisticated_car_headlight_reveals_intricate_components_and_reflections.jpg' },
    { title: 'Driving through heavy rain on a dimly lit road with blurred visibility and windshield wipers in action', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Driving_through_heavy_rain_on_a_dimly_lit_road_with_blurred_visibility_and_windshield_wipers_in_action.jpg' },
    { title: 'Quiet parking lot with a white car', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Quiet_parking_lot_with_a_white_car.jpg' },
    { title: 'Buses and vans in parking lot on West Bank side of Hussein-Allenby Bridge', author: 'Daniel Case', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Buses_and_vans_in_parking_lot_on_West_Bank_side_of_Hussein-Allenby_Bridge.jpg' },
    { title: 'Car washing activity at a residential driveway', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Car_washing_activity_at_a_residential_driveway.jpg' },
    { title: 'Cleaning interior', author: 'Juanacosta84', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Cleaning_interior.jpg' },
    { title: 'Driver sanitizes car interior with spray while inside a vehicle', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Driver_sanitizes_car_interior_with_spray_while_inside_a_vehicle.jpg' },
    { title: 'Closeup view of manual transmission in the car interior', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Closeup_view_of_manual_transmission_in_the_car_interior.jpg' },
    { title: 'Auto detailing portland', author: 'Squeegeedetailofficial', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Auto_detailing_portland.jpg' },
    { title: 'Fundraiser Car Wash DVIDS93954', author: 'Spc. Eric Liesse', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Fundraiser_Car_Wash_DVIDS93954.jpg' },
    { title: 'Water beads cover the surface of a black car parked outside as rain falls steadily', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Water_beads_cover_the_surface_of_a_black_car_parked_outside_as_rain_falls_steadily.jpg' },
    { title: 'Close-up view of a car door handle showing details during a rainy day', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Close-up_view_of_a_car_door_handle_showing_details_during_a_rainy_day.jpg' },
    { title: 'Rain droplets resting on a car hood outdoors after rainfall', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Rain_droplets_resting_on_a_car_hood_outdoors_after_rainfall.jpg' },
    { title: 'A close-up view shows the blue door of a vintage car', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:A_close-up_view_shows_the_blue_door_of_a_vintage_car.jpg' },
    { title: 'Windshield Wiper', author: 'Cujaniene', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Windshield_Wiper.jpg' },
    { title: 'Rainy Windshield Wipers', author: 'NWSPhoenix', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Rainy_Windshield_Wipers.jpg' },
]
