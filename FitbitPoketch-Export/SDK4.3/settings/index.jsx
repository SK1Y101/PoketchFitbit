function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Watch face customisation</Text>}>
        <Select
          label={"Watch Skin"}
          settingsKey="skin"
          options={[
            {name:"Diamond/Pearl", value:0, subname:"The Pokétch given to the protagonist in Diamond and Pearl."},
            {name:"Platinum", value:1, subname:"The Pokétch given to the protagonist in Platinum."},
            {name:"Brilliant Diamond / Shining Pearl", value:2, subname:"The Pokétch given to the protagonist in Brilliant Diamond and Shining Pearl."},
            {name:"Watch face only", value:3, subname:"Only show the watch face, without the decorative elements."},
          ]}
          renderItem={
            (option) =>
              <TextImageRow
                label={option.name}
                sublabel={option.subname}
              />
          }
        />
        <Select
          label={"Edge Colour"}
          settingsKey="edgeColour"
          options={[
            {name: "D/P Blue", icon:"https://www.colorhexa.com/3050F8.png", value: "#3050F8", subname:"The Male Pokétch colour in Diamond and Pearl."},
            {name: "D/P Pink", icon:"https://www.colorhexa.com/FF41BC.png", value: "#FF41BC", subname:"The Female Pokétch colour in Diamond and Pearl."},
            {name: "D/P Orange", icon:"https://www.colorhexa.com/E28B55.png", value: "#E28B55", subname:"The Rivals Pokétch colour in Diamond and Pearl."},
            {name: "Pt Blue", icon:"https://www.colorhexa.com/4C8CB9.png", value: "#4C8CB9", subname:"The Male Pokétch colour in Platinum."},
            {name: "Pt Pink", icon:"https://www.colorhexa.com/EC5E6A.png", value: "#EC5E6A", subname:"The Female Pokétch colour in Platinum."},
            {name: "BdSp Blue", icon:"https://www.colorhexa.com/164CF6.png", value: "#164CF6", subname:"The Male Pokétch colour in Brilliant Diamond and Shining Pearl"},
            {name: "BdSp Red", icon:"https://www.colorhexa.com/CC1031.png", value: "#CC1031", subname:"The Femal Pokétch colour in Brilliant Diamond and Shining Pearl"},
            {name: "BdSp Orange", icon:"https://www.colorhexa.com/FF874A.png", value: "#FF874A", subname:"The Rivals Pokétch colour in Brilliant Diamond and Shining Pearl"},
          ]}
          renderItem={
            (option) =>
              <TextImageRow
                label={option.name}
                sublabel={option.subname}
                icon={option.icon}
              />
          }
        />
        <Select
          label={"Face Colour"}
          settingsKey="faceColour"
          options={[
            {name: "D/P Grey", icon:"https://www.colorhexa.com/303030.png", value: "#303030", subname:"The Pokétch face colour in Diamond and Pearl."},
            {name: "Pt White", icon:"https://www.colorhexa.com/E0E0E0.png", value: "#E0E0E0", subname:"The Pokétch face colour in Platinum."},
            {name: "BdSp Grey", icon:"https://www.colorhexa.com/272727.png", value: "#272727", subname:"The Pokétch face colour in Brilliant Diamond and Shining Pearl."},
          ]}
          renderItem={
            (option) =>
              <TextImageRow
                label={option.name}
                sublabel={option.subname}
                icon={option.icon}
              />
          }
        />
        <Select
          label={"Screen Colour"}
          settingsKey="screenColour"
          options={[
            {name: "Green", icon:"https://www.colorhexa.com/70B070.png", value: "#70B070", subname:"The default Pokétch screen colour."},
            {name: "Yellow", icon:"https://www.colorhexa.com/B8B071.png", value: "#B8B071", subname:""},
            {name: "Orange", icon:"https://www.colorhexa.com/C09068.png", value: "#C09068", subname:""},
            {name: "Red", icon:"https://www.colorhexa.com/D8706F.png", value: "#D8706F", subname:""},
            {name: "Violet", icon:"https://www.colorhexa.com/A170B1.png", value: "#A170B1", subname:""},
            {name: "Indigo", icon:"https://www.colorhexa.com/8888F8.png", value: "#8888F8", subname:""},
            {name: "Blue", icon:"https://www.colorhexa.com/57B8BF.png", value: "#57B8BF", subname:""},
            {name: "Grey", icon:"https://www.colorhexa.com/A0A0A0.png", value: "#A0A0A0", subname:""},
          ]}
          renderItem={
            (option) =>
              <TextImageRow
                label={option.name}
                sublabel={option.subname}
                icon={option.icon}
              />
          }
        />
        <Select
          label={"Mascot Sprite"}
          settingsKey="mascotSprite"
          options={[
            {name:"Pikachu", value:0, subname:"The Original Poketch Mascot."},
            {name:"Eevee", value:1, subname:"Want an adorable Eevee on your Poketch instead?."},
          ]}
          renderItem={
            (option) =>
              <TextImageRow
                label={option.name}
                sublabel={option.subname}
              />
          }
        />
      </Section>
      <Section
        title={<Text bold align="center">Application settings</Text>}>
        <Select
          label={"Visible apps"}
          multiple
          settingsKey="activeApps"
          options={[
            {name:"Pedometer",       value:1},
            {name:"Stats View",      value:2},
            {name:"Counter",         value:3},
            {name:"Analogue Watch",  value:4},
            {name:"Move Calculator", value:5},
            {name:"Calendar",        value:6},
            {name:"Timer",           value:7},
          ]}
        />
        <Text>The Pokétch applications that will be accessible to the user.</Text>
      </Section>
      <Section
        title={<Text bold align="center">Interface settings</Text>}>
        <Select
          label={"Secondary interaction"}
          settingsKey="secondInteract"
          options={[
            {name:"Long Press", value:0, subname:"Press and hold a button to use it's secondary feature."},
            {name:"Multi Tap",  value:1, subname:"Tap a button in quick succession to use it's secondary feature."},
          ]}
          renderItem={
            (option) =>
              <TextImageRow
                label={option.name}
                sublabel={option.subname}
              />
          }
        />
        <Text>How the user will interact with the secondary functionality of a button</Text>
        <Slider
          label={"Long Press Time"}
          settingsKey="longPressTime"
          min="100"
          max="2000"
          step="100"
        />
        <Text align="center">{props.settings.longPressTime + " ms"}</Text>
        <Text>The minimum time a button should be held for to activate its secondary feature, provided the secondary interaction is set to Long Press.</Text>
        <Slider
          label={"Multi Tap Time"}
          settingsKey="multiTapTime"
          min="100"
          max="1000"
          step="100"
        />
        <Text align="center">{props.settings.multiTapTime + " ms"}</Text>
        <Text>The maximum time between button presses to count as consecutive, and thus activate its secondary feature, provided the secondary interaction is set to Multi Tap.</Text>
      </Section>
      <Section
        title={<Text bold align="center">Additional links</Text>}>
        <Link source="https://github.com/SK1Y101/PoketchFitbit">The development page for this project.</Link>
        <Link source="https://github.com/SK1Y101/PoketchFitbit/wiki">Wiki for this watch face.</Link>
        <Link source="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9tch">Pokétch information from the games.</Link>
        <Link source="https://www.buymeacoffee.com/lloydwaltersj">Support my work!</Link>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
