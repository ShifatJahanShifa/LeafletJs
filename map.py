import folium
import requests
import pandas
# create a map object
m = folium.Map(location=(23.6850,90.3563), zoom_start=12, control_scale=True)

# folium.TileLayer('openstreetmap').add_to(m)  # OpenStreetMap
# # folium.TileLayer('cartodbpositron',overlays=True).add_to(m)  # CartoDB Positron
# # # folium.TileLayer('stamenterrain').add_to(m)  # Stamen Terrain
# # folium.TileLayer('stamenwatercolor',overlays=True).add_to(m)  # Stamen Watercolor
# folium.TileLayer('cartodbdark_matter').add_to(m)  # CartoDB Dark Matter
# folium.LayerControl().add_to(m)
#generate map

#add dif tiles

#add marker
# custom marker icon
logoicon=folium.features.CustomIcon('imgforicon.jpg',icon_size=(50,50))
folium.Marker(
    location=[23.6850,90.3563],
    tooltip="Click me!",
    popup="Mt. Hood Meadows",
    icon=folium.Icon(icon="cloud"),
).add_to(m)

# folium.Marker(
#     location=[23.7557,90.4112],
#     tooltip="Click me!",
#     popup="Cool shifa lives here",
#     icon=folium.Icon(color="green"),
# ).add_to(m)

folium.Marker(
    location=[23.7557,90.4112],
    tooltip="Click me!",
    popup="Cool shifa lives here",
    icon=logoicon,
).add_to(m)

# // feature group and add layer control

group_1 = folium.FeatureGroup("first group").add_to(m)
folium.Marker((21.7557,91.4112), icon=folium.Icon("red")).add_to(group_1)
folium.Marker((20.7557,88.4112), icon=folium.Icon("red")).add_to(group_1)

group_2 = folium.FeatureGroup("second group").add_to(m)
folium.Marker((25.7557,89.4112), icon=folium.Icon("green")).add_to(group_2)

# folium.LayerControl().add_to(m)


# geojson and topojson overlays
# m=folium.Map(tiles="cartodbpositron")

# geojson_data = requests.get(
#     "https://raw.githubusercontent.com/python-visualization/folium-example-data/main/world_countries.json"
# ).json()

# folium.GeoJson(geojson_data, name="hello world").add_to(m)

# folium.LayerControl().add_to(m)
# group_3 = folium.FeatureGroup("third group").add_to(m)
state_geo = requests.get(
    "https://raw.githubusercontent.com/python-visualization/folium-example-data/main/us_states.json"
).json()
state_data = pandas.read_csv(
    "https://raw.githubusercontent.com/python-visualization/folium-example-data/main/us_unemployment_oct_2012.csv"
)

folium.Choropleth(
    geo_data=state_geo,
    name="choropleth",
    data=state_data,
    columns=["State", "Unemployment"],
    key_on="feature.id",
    fill_color="YlGn",
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name="Unemployment Rate (%)",
).add_to(m)

folium.LayerControl().add_to(m)
m.save('map.html')