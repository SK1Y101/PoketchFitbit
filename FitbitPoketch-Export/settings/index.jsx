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
            {name: "D/P Blue", icon:"https://www.colorhexa.com/3050F8.png", value: 0, subname:"The Male Pokétch colour in in Diamond and Pearl."},
            {name: "D/P Pink", icon:"https://www.colorhexa.com/FF41BC.png", value: 1, subname:"The Female Pokétch colour in in Diamond and Pearl."},
            {name: "D/P Orange", icon:"https://www.colorhexa.com/E28B55.png", value: 2, subname:"The Rivals Pokétch colour in in Diamond and Pearl."},
            {name: "Pt Blue", icon:"https://www.colorhexa.com/4C8CB9.png", value: 3, subname:"The Male Pokétch colour in Platinum."},
            {name: "Pt Pink", icon:"https://www.colorhexa.com/EC5E6A.png", value: 4, subname:"The Female Pokétch colour in Platinum."},
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
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
