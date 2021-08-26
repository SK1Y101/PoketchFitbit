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
            {name:"Watch face only", value:2, subname:"Only show the watch face, without the decorative elements."},
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
