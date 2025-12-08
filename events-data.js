// events-data.js

const events = [
  { date: "2004-01-01", title: "საგზაო ფონდი", 
    description: `საგზაო ფონდის სამმართველოს <strong>გაუუქმდა გადასახადების აკრეფის ფუნქცია</strong>. საგზაო დეპარტამენტი ეკონომიკური განვითარების სამინისტროს სტრუქტურულ ერთეულად გარდაიქმნა. საგზაო ფონდის შევსების ძირითადი წყაროები იყო ბენზინის აქციზიდან მიღებული 30 პროცენტი, საქართველოში ავტოსატრანსპორტო საშუალების შემოსვლის გადასახადი, ზენორმატიული დატვირთვის გადასახადი და გვირაბიდან მიღებული შემოსავლები. გადასახადების აკრეფის ფუნქცია ფინანსთა სამინისტროს საგადასახადო დეპარტამენტმა შეითავსა. სტრუქტურული ცვლილებები <strong>კორუფციასთან ბრძოლის და სახელმწიფო გადასახადების აკრეფის</strong> ერთ-ერთ ეფექტურ საშუალებად მიიჩნეოდა. საგზაო ფონდიდან მიღებული შემოსავლები გზების რეაბილიტაციისთვის გამოიყოფოდა.`, 
    category: "news",
    source: {
      name: "24 საათი #185 (734), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/40254/1/24Saati_2004_N185%28734%29.pdf"
    }
  },

  { date: "2004-01-04", title: "საპრეზიდენტო არჩევნები", 
    description: `2003 წლის ნოემბერში, საქართველოს მაშინდელი პრეზიდენტის, ედუარდ შევარდნაძის გადადგომით, შედგა ე.წ. "ვარდების რევოლუცია". 2004 წლის ვადამდელ საპრეზიდენტო არჩევნებში, მიხეილ სააკაშვილმა ხმათა 96% აიღო და საქართველოს მესამე პრეზიდენტი გახდა. როგორც მისი პრეზიდენტობის მომდევნო წლებში გამოჩნდა, მიხეილ სააკაშვილის მმართველობამ და პირადად მან, დიდი ზეგავლენა იქონია საქართველოს ქალაქების განვითარებისა და <strong>[ურბანული] მობილობის</strong> მართვის კუთხით. რევოლუციის ერთ-ერთ თვალსაჩინო სიმბოლოდ, საქალაქთაშორისო ავტობუსით, მხარდამჭერებთან ერთად, წალენჯიხიდან თბილისში ჩამოსული მიხეილ სააკაშვილის ეს კადრებიც იქცა.`, 
    category: "event", video: "https://www.youtube.com/embed/RW-Rfapzim0?si=HpAjBJ3dQt6UfNCL", 
    source: {
      name: "საქართველოს რესპუბლიკა #3 (4732), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/12623/1/SakartvelosRespublika_2004_N3.pdf"
    }
  },

  { date: "2004-01-06", title: "თბილისის საკრებულო", 
    description: `თბილისის საკრებულოს თავმჯდომარედ, სააკაშვილის ნაცვლად, ზაზა ბეგაშვილი აირჩიეს. ზაზა ბეგაშვილზე <a class="in_text_source" href="https://for.ge/view/16598/rogor-gamdidrda-zaza-begaSvili.html" target="_blank">არსებობს ცნობები</a> რომ, ფლობდა #6 სამარშრუტო ხაზს, რომელზეც 15 სამარშრუტო ტაქსი მოძრაობდა და <strong>მხოლოდ მათ ჰქონდათ ცენტრალურ ქუჩებზე (მაგ. აღმაშენებლის გამზირი) გავლის უფლება,</strong> მაშინ როცა მისი კონკურენტები იძულებული იყვნენ პარალელური ქუჩებით ესარგებლათ. 2004 წლის 5 აგვისტოს გამოქვეყნებული სტატიის მიხედვით (24 საათი, #184), ამ ხაზზე, მოძრაობდა 32 ავტომანქანა და 15 წუთის ინტერვალით, ერთი მიმართულებით, 64 სამარშრუტო ტაქსი იყო ხაზზე.`, 
    category: "event", image: "https://iverieli.nplg.gov.ge/bitstream/1234/454712/1/Valeri-Grigalashvili-106.jpg", 
    source: {
      name: "რადიო თავისუფლება, 6 იანვარი 2004",
      url: "https://www.radiotavisupleba.ge/a/1532938.html"
    }
  },

  { date: "2004-01-11", title: "თბილისი - საცობიანი ქუჩების ქალაქი", 
    description: `საცობების პრობლემა 2004 წლის დასაწყისშიც აქტუალური იყო. მთავარ გამომწვევ მიზეზებად მრავალი ფაქტორი სახელდებოდა. მათ შორის, გამორთული შუქნიშნები, სამარშრუტო ტაქსებით გადატვირთულობა და  სახიფათო მანევრი, ავტოინსპექტორების  კვალიფიკაცია, გარემოვაჭრეების მიერ დაკავებული საჯარო სივრცე და ვიწრო ქუჩები. როგორც თბილისის საგზაო პოლიციის სამმართველოს უფროსი, გია ბერაძე ამბობა: <blockquote>ქალაქის ქუჩები გაუმტარი გახდა. ყველამ ვიცით,როდის გაკეთდა ეს გზები [...] თბილისში 140 000 მანქანა არის რეგისტრირებული [...] ქუჩებში ცალმხრივი მოძრაობა დაწესდება. ეს უპირველესად ეხება ვარაზისხევს, კოსტავას, მელიქიშვილის, საბურთალოს ქუჩებს</blockquote>`, 
    category: "article", image: "კვირის პალიტრა #3 2004.png'", 
    source: {
      name: "კვირის პალიტრა #1 (462), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/16516/1/KvirisPalitra_2004_N01.pdf"
    }
  },

  { date: "2004-01-25", title: "მიხეილ სააკაშვილის ინაუგურაცია", 
    description: `4 იანვრის საპრეზიდენტო არჩევნებში გამარჯვების შემდეგ, მიხეილ სააკაშვილის ინაუგურაცია პარლამენტის შენობაში, რუსთაველის გამზირზე ჩატარდა`, 
    category: "article", image: "https://dspace.nplg.gov.ge/bitstream/1234/147161/1/Mikheil_Saakashvili%20%2810%29.jpg", 
    source: {
      name: "ფოტოს ავტორი ელეფთერ ლაფაჩი",
      url: "https://dspace.nplg.gov.ge/handle/1234/147161"
    }
  },

  { date: "2004-02-03", title: "ტრანსპორტისა და კავშირგაბმულობის სამინისტრო", 
    description: `სახელმწიფო კანცელარიაში დააკავეს მინისტრი მერაბ ადეიშვილი. მას <strong>ძალაუფლების გადამეტებასა და სახელმწიფო სახსრების მითვისებაში</strong> ედებოდა ბრალი. იგი წინასწარი პატიმრობიდან ორ თვეში, 1.5 მლნ აშშ დოლარის გადახდის შემდეგ გაათავისუფლეს. მის საქმეში ასევე ფიგურირებდა <a class="in_text_source" href="https://dspace.nplg.gov.ge/bitstream/1234/40121/1/24Saati_2004_N64%28613%29.pdf" target="_blank">ავიაციის საკითხიც (გვ. A7).</a> მერაბ ადეიშვილის სახელს უკავშირდება საქართველოს სატრანზიტო პოტენციალის აქტუალიზება ადრეული 90-იანი წლებიდან და დამოუკიდებელი საქართველოს სატრანსპორტო კონცეფციის <a class="in_text_source" href="https://gfsis.org.ge/ge/oral-history/view/917" target="_blank">ჩამოყალიბება და რეალიზება.</a>`, 
    category: "", video: "https://www.youtube.com/embed/kZcC2wNAruE?si=ikzYvroFGK1Uvd4A", 
    source: [
      {
        name: "Civil Georgia, 2004 (დაკავება)",
        url: "https://civil.ge/ka/archives/131513"
      },
      {
        name: "Civil Georgia, 2004 (გათავისუფლება)",
        url: "https://civil.ge/ka/archives/131967"
      }
    ]
  },

  { date: "2004-02-17", title: "მშენებლობისა და ურბანიზაციის სამინისტრო", 
    description: `მინისტრ მერაბ ჩხენკელს ბრალი წაუყენეს, თუმცა არ დაუკავებიათ. მას "ლოკომოტივის" სტადიონის მშენებლობისას დაშვებულ კანონდარღვევებს ედავებოდნენ, რადგან <strong>ექსპერტიზაგაუვლელი ობიექტი ჩაიბარა</strong>. <br>გენერალური პროკურორი, ირაკლი ოქრუაშვილი: <blockquote>მერაბ ჩხენკელს არ დააკავებენ. სამართალდამცველებს დღეს სრული საფუძველი ჰქონდათ დაეკავებინათ იგი, თუმცა ამას არ გააკეთებენ</blockquote><br><a class="in_text_source" href="http://www.nplg.gov.ge/bios/en/00002521/" target="_blank">მერაბ ჩხენკელის ბიოგრაფია</a>`, 
    category: "", image: "https://dspace.nplg.gov.ge/bitstream/1234/230339/1/Chxenkeli_M_Msheneblobis_Ministri%20_Infrastruqtura%20%283%29.jpg", 
    source: {
      name: "24 საათი #40 (589), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/40003/1/24Saati_2004_N40%28589%29.pdf"
    }
  },

  { date: "2004-02-20", title: "სამინისტროების გაერთიანება", 
    description: `კორუფციული საქმეების გამოაშკარავების შემდეგ, <strong>ინფრასტრუქტურისა და განვითარების სამინისტროს საფარქვეშ</strong> გაერთიანდა მშენებლობისა და ურბანიზაციის და ტრანსპორტისა და კომუნიკაციების სამინისტროები. ახალ მინისტრად თამარ სულუხია დაინიშნა: <blockquote>მთავარია მენეჯმენტი, მონდომება და ღირებულებები. უკანონო მშენებლობებთან ბრძოლის პოლიტიკა [...] ერთმნიშვნელოვნად კატეგორიული და მკაცრი იქნება [...] სად რა და რამდენი სართული შეიძლება აშენდეს, ტერიტორიულად როგორ შეიძლება იჯდეს სივრცისა თუ გეგმარების თვალსაზრისით.</blockquote><br><a class="in_text_source" href="https://ka.wikipedia.org/wiki/%E1%83%97%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0_%E1%83%A1%E1%83%A3%E1%83%9A%E1%83%A3%E1%83%AE%E1%83%98%E1%83%90" target="_blank">თამარ სულუხიას ბიოგრაფია</a>`, 
    category: "", image: "https://dspace.nplg.gov.ge/bitstream/1234/155395/1/Sulukhia.jpg", 
    source: {
      name: "24 საათი #42 (591), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/40010/1/24Saati_2004_N42%28591%29.pdf"
    }
  },

  { date: "2004-02-28", title: "თბილისის საგზაო პოლიცია", 
    description: `გენერალურ პროკურატურაში 2002-2003 წლებში, <strong>15 000-მდე განუბაჟებელი ავტომობილის შემოყვანასთან</strong> დაკავშირებულ საქმეზე დაიკითხნენ თბილისის საგზაო პოლიციის ყოფილი უფროსი, დავით კობახიძე და შსს მინისტრის ყოფილი მოადგილე, დავით თოდუა. პროკურატურაში მოწმის სახით დაკითხეს თბილისის საგზაო პოლიციის უფროსი, შალვა ოგბაიძეც - 2003 წლის დეკემბერში <strong>80-მდე განუბაჟებელი ავტომობილის</strong> შემოყვანასთან დაკავშირებით: <blockquote>აღნიშნული ინფორმაცია მე მოვიპოვე და გენპროკურატურას პირადად გადავეცი.</blockquote><p>რამდენიმე დღის შემდეგ, ოგბაიძემ თანამდებობა დატოვა.</p><br><a class="in_text_source" href="https://tbsakrebulo.gov.ge/index.php?m=591&faction_id=422&member=262&fraction=&name=%E1%83%A8%E1%83%90%E1%83%9A%E1%83%95%E1%83%90%20%E1%83%9D%E1%83%92%E1%83%91%E1%83%90%E1%83%98%E1%83%AB%E1%83%94" target="_blank">შალვა ოგბაიძის ბიოგრაფია</a>`, 
    category: "", image: "https://dspace.nplg.gov.ge/bitstream/1234/112997/1/Jemal_kasraZe-376.jpg", 
    source: [
      {
          name: "24 საათი #49 (598), 2004",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/40028/1/24Saati_2004_N49%28598%29.pdf"
        },
        {
          name: "საქართველოს რესპუბლიკა #48 (4777), 2004",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/13113/1/SakartvelosRespublika_2004_N48.pdf"
        },
        {
          name: "საქართველოს რესპუბლიკა #51 (4780), 2004",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/13122/1/SakartvelosRespublika_2004_N51.pdf"
        }
      ]
  },

  { date: "2004-03-02", title: "სანიტარული დღეები თბილისში", 
    description: `სანიტარული დღეები, ქალაქის მასშტაბით, <strong>შიდაკვარტალური დასუფთავებისთვის იყო გამოყოფილი</strong>. ამ გზით, გამგეობები ცდილობდნენ მუნიციპალური სერვისების არარსებობის პირობებში, საყოველთაო დასუფთავების საკითხი მოსახლეობის დახმარებით მოეგვარებინათ: <blockquote>ეს არ არის საჩვენებელი დასუფთავება. ჩვენ სადარბაზოებთან მივედით და იქ დავასუფთავეთ და [...] მოსახლეობამაც აგვიბა მხარი.</blockquote><p>სანიტარულ დასუფთავებას ბაზრებიდან და მიმდებარე ქუჩებიდან და ტროტუარებიდან გარემოვაჭრეების გასაყვანადაც იყენებდნენ.</p>`, 
    category: "", image: "./img/24 saati - march 2 2004.png", 
    source: [
      {
        name: "24 საათი #57 (606)",
        url: "https://dspace.nplg.gov.ge/bitstream/1234/40113/1/24Saati_2004_N57%28606%29.pdf"
      },
      {
        name: "საქართველოს რესპუბლიკა #53 (4781)",
        url: "https://dspace.nplg.gov.ge/bitstream/1234/13124/1/SakartvelosRespublika_2004_N52.pdf"
      }
    ]
  },

  { date: "2004-03-03", title: "საგზაო პოლიციის საგუშაგოები", 
    description: `შს მინისტრი, გიორგი ბარამიძე ქალაქებთან საგზაო პოლიციის საგუშაგოების გაუქმებას უჭერს მხარს: <blockquote>ბლოკ-პოსტები არ არის გამოსვალი დანაშაულის წინააღმდეგ ბრძოლაში. სანამ ქვეყანას არ ეყოლება ისეთი პოლიცია, რომელიც ქრთამს არ აიღებს, [...] ამგვარი პუნქტების მუშაობა არაა მიზანშეწონილი.</blockquote>`, 
    category: "", image: "https://iverieli.nplg.gov.ge/bitstream/1234/229617/1/Baramidze_Giorgi%20%281%29.JPG", 
    source: {
      name: "24 საათი #52 (601), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/40107/1/24Saati_2004_N52%28601%29.pdf"
    }
  },

  { date: "2004-03-22", title: "მერიის ტრანსპორტის კომისია", 
    description: `სამარშრუტო ხაზების სალიცენზიო პერიოდი 2004 წლის 1 იანვარს დასრულდა. მუნიციპალიტეტის მიერ ქაოტური ურბანული ტრანსპორტის მართვა <strong>კერძო ოპერატორებისთვის სატენდერო პირობების შემუშავებაზე გადიოდა.</strong> ახალ სატენდერო პირობებზე ჯერ კიდევ, საკრებულოში მიხეილ სააკაშვილის მიერ შექმნილი ჯგუფის მუშაობა პროდუქტიული ვერ აღმოჩნდა. ბუნდოვანი და წინააღმდეგობრივი საკანონმდებლო ბაზის პირობებში, სუსტი საჯარო სამსახურისა და ძლიერი ბიზნეს ინტერესების თანაკვეთის შედეგად, სექტორის მართვის ფუნქციას მუნიციპალიტეტი სრულყოფილად ვერ ართმევდა თავს. მიუხედავად ამისა, ტრანსპორტის სამსახურის მაშინდელი უფროსის, ოთარ ჭიპაშვილის თქმით, მძღოლების უმრავლესობა, <strong>მარშრუტების მუნიციპალურ საკუთრებაში გადმოსვლას მხარს უჭერდა.</strong> სუსტი თვითთმმართველობისა და პოსტ-რევოლუციური ხელისუფლების ნეოლიბერალური ხასიათის კვალდაკვალ, სამარშრუტო ხაზების მუნიციპალიზებაზე საუბარი, საინტერესოდ ჟღერდა.`, 
    category: "", image: "", 
    source: {
      name: "24 საათი #69 (618), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/40126/1/24Saati_2004_N69%28618%29.pdf"
    }
  },

  { date: "2004-03-22", title: "თბილისის გენგეგმა", 
    description: `ადგილობრივი თვითმმართველობის <strong>სუსტი და არამდგრადი ინსტიტუციური ხასიათი</strong> გამოიკვეთა თბილისის გენგეგმისა და ქაოტური და უკანონო განაშენიანების შესახებ მსჯელობისას ქალაქის მთავრობის სხდომაზეც. საკმარისი ფინანსური რესურსების უქონლობის გამო, ქალაქის საკრებულოს, ძველი, 1972 წლის გენგეგმის მოქმედების ვადის გასაგრძელებლად, <strong>საქართველოს პრეზიდენტის თანხმობა სჭირდებოდა.</strong> ახალი გენგეგმის დაფინანსების საჭიროებაზე საუბრობდა ინფრასტრუქტურისა და განვითარების მინისტრიც: <blockquote>თუ ამას ჩვენი სახსრებით ვერ შევძლებთ, დავიწყებთ თანამშრომლობას არასამთავრობო ორგანიზაციებთან</blockquote>`, 
    category: "", image: "", 
    source: {
      name: "24 საათი #69 (618), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/40126/1/24Saati_2004_N69%28618%29.pdf"
    }
  },
  
  { date: "2004-03-28", title: "რიგგარეშე საპარლამენტო არჩევნები", 
    description: `<blockquote>28 მარტს საქართველოში მხოლოდ ახალი პარლამენტის არჩევნები როდი გაიმართა [...]  საბოლოოდ "შედგა" ნოემბრის ლიბერალური რევოლუცია.</blockquote><p>ვარდების რევოლუციის შემდეგ ჩატარებულ რიგგარეშე საპარლამენტო არჩევნებში <strong>"ნაციონალ-დემოკრატებმა" გაიმარჯვეს - 67.02%;</strong> "მემარჯვენე ოპოზიცია-მრეწველებმა" 7.6% აიღეს და ერთადერთი ოპოზიციური ძალა აღმოჩნდა, რომელმაც შეძლო იმდროინდელი, 7%-იანი ბარიერის გადალახვა.</p>`, 
    category: "", image: "", 
    source: {
      name: "24 საათი #74 (623), 2004",
      url: "https://dspace.nplg.gov.ge/bitstream/1234/40131/1/24Saati_2004_N74%28623%29.pdf"
    }
  },

  { date: "2004-04-19", title: "ახალი მერი და პრემიერი", 
    description: `ცესკოს ყოფილი ხელმძღვანელი, ზურაბ ჭიაბერაშვილი, საპარლამენტო არჩევნების ჩატარების შემდეგ, თბილისის მერად დანიშნა პრეზიდენტმა მიხეილ სააკაშვილმა. მასთან ერთად, თბილისის პრემიერად, ბიძინა ბრეგაძე დაინიშნა. სააკაშვილმა ორივეს <strong>ექვსთვიანი გამოსაცდელი ვადა მისცა</strong> სტრუქტურული რეფორმების ჩასატარებლად. <blockquote>ყველაზე მეტად თვალშისაცემი არის გზების და ტრანსპორტის პრობლემა, უკანონო მშენებლობები - ქალაქმა დაკარგა იერსახე</blockquote><p>ზურაბ ჭიაბერაშვილმა ვანო ზოდელავა ჩაანაცვლა. თბილისის პრემიერის მოვალეობას კი თეიმურაზ ქურხული ასრულებდა.</p>`, 
    category: "", image: "https://dspace.nplg.gov.ge/bitstream/1234/183376/1/chiaberashvili%20zurab.jpg", 
    source: [
        {
          name: "24 საათი #92 (641)",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/40149/1/24Saati_2004_N92%28641%29.pdf"
        },
        {
          name: "საქართველოს რესპუბლიკა #89 (4818)",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/13281/1/SakartvelosRespublika_2004_N89.pdf"
        },
        {
          name: "რადიო თავისუფლება, 19 აპრილი 2004",
          url: "https://www.radiotavisupleba.ge/a/1534822.html"
        }, 
        {
          name: "რადიო თავისუფლება, 20 აპრილი 2004",
          url: "https://www.radiotavisupleba.ge/a/1534842.html"
        }
      ]
  },

  { date: "2004-05-07", title: "თბილისის ახალი მთავრობა", 
    description: `საკრებულომ ქალაქის ახალი მთავრობა დაამტკიცა. თბილისის პრემიერს, ბიძინა ბრეგაძეს ორი მოადგილე ეყოლება - თემურ ქურხული და გიორგი არევაძე. კულტურისა და სპორტის სამსახურს ისევ დავით ოქიტაშვილი უხელმძღვანელებს. ეკონომიკური პოლიტიკის მიმართულებით, მთავარ საზრუნავად <strong>თბილისში საინვესტიციო გარემოს შექმნა მიიჩნევა.</strong> ტრანსპორტის საქალაქო სამსახურის უფროსი ზურაბ ჩიკვილაძის კი აცხადებდა, რომ <blockquote>პირველ რიგში, ქუჩების განტვირთვა მოხდება. ექვს თვეში ქალაქმა უნდა დაინახოს, რომ მდგომარეობის გამოსწორებისკენ მივდივართ. ჰოლანდიიდან ლამაზი და კომფორტული ავტობუსები შემოდის. ალბათ, ბევრი ადამიანი დაკარგავს სამსახურს, მაგრამ სამარშრუტო ტაქსები უნდა გავანახევროთ.</blockquote>`, 
    category: "", image: "https://dspace.nplg.gov.ge/bitstream/1234/177102/1/Image00015.jpg", 
    source: [
        {
          name: "24 საათი #108 (657)",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/40166/1/24Saati_2004_N108%28657%29.pdf"
        },
        {
          name: "საქართველოს რესპუბლიკა #105 (4834)",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/13475/1/SakartvelosRespublika_2004_N105.pdf"
        }
      ]
  },

  { date: "2004-05-17", title: "20-თეთრიანი ავტობუსები ევროპიდან", 
    description: ` და სპორტის სამსახურს ისევ დავით ოქიტაშვილი უხელმძღვანელებს. ეკონომიკური პოლიტიკის მიმართულებით, მთავარ საზრუნავად <strong>თბილისში საინვესტიციო გარემოს შექმნა მიიჩნევა.</strong> ტრანსპორტის საქალაქო სამსახურის უფროსი ზურაბ ჩიკვილაძის კი აცხადებდა, რომ <blockquote>პირველ რიგში, ქუჩების განტვირთვა მოხდება. ექვს თვეში ქალაქმა უნდა დაინახოს, რომ მდგომარეობის გამოსწორებისკენ მივდივართ. ჰოლანდიიდან ლამაზი და კომფორტული ავტობუსები შემოდის. ალბათ, ბევრი ადამიანი დაკარგავს სამსახურს, მაგრამ სამარშრუტო ტაქსები უნდა გავანახევროთ.</blockquote>`, 
    category: "", image: "https://dspace.nplg.gov.ge/bitstream/1234/177102/1/Image00015.jpg", 
    source: [
        {
          name: "24 საათი #108 (657)",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/40166/1/24Saati_2004_N108%28657%29.pdf"
        },
        {
          name: "საქართველოს რესპუბლიკა #105 (4834)",
          url: "https://dspace.nplg.gov.ge/bitstream/1234/13475/1/SakartvelosRespublika_2004_N105.pdf"
        }
      ]
  },
  
  //{ date: "2004-03-31",
  //  title: "2020 Parliamentary Elections",
  //  description: "Votes by party in both proportional and majoritarian races.",
  //  charts: [
  //    {
  //      labels: ["ახ.საქართველოსთვის", "ნაც.მოძრაობა", "ლეიბორისტები", "ბურჯანაძე", "ახ.მემარჯვენეები", "აღორძინება"],
  //      data: [23.4, 22.3, 14.0, 8.2, 7.9, 7.8],
  //      chart_title: 'ძველი არჩევნები',
  //      label: "პროპორციული ხმები (%)",
  //      colors: ["#3498db", "#e74c3c"]
  //    },
  //    {
  //      labels: ["ნაც.მოძრაობა-ბურჯანაძე", "მემარჯვენე ოპოზიცია", "აღორძინება", "ლეიბორისტები", "თავისუფლება", "ედპ", "პატიაშვილი-ერთობა"],
  //      data: [67.02, 7.6, 6.13, 5.79, 4.19, 2.55, 2.37],
  //      chart_title: 'ახალი არჩევნები',
  //      label: "მაჟორიტარული მანდატები",
  //      colors: ["#3498db", "#9b59b6", "#2ecc71"]
  //    }
  //  ]
  //},







  { date: "2016-06-20", title: 
    "Metro Rail Expansion", description: "Investments in metro networks.", 
    category: "Infrastructure", image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" },
  { date: "2017-01-15", title: "Unified Metropolitan Transport Authority", description: "UMTAs formed in several states.", category: "Infrastructure", image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" },
  { date: "2017-01-15", title: "Unified Metropolitan Transport Authority", description: "UMTAs formed in several states.", category: "Infrastructure", image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" },
  { date: "2017-01-15", title: "Unified Metropolitan Transport Authority", description: "UMTAs formed in several states.", category: "Infrastructure", image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" },
  { date: "2017-01-15", title: "Unified Metropolitan Transport Authority", description: "UMTAs formed in several states.", category: "Infrastructure", image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" },
  { date: "2018-07-10", title: "Smart Cities Phase II", description: "Mobility and governance integration.", category: "Policy", image: "https://via.placeholder.com/400x300?text=Metro+2016" },
  {
    date: "2018-09-01",
    title: "Pilot Showcase",
    description: "A short demo of the mobility system in action.",
    video: "https://www.youtube.com/embed/ybV0y509-tg?si=Xj4YvuByaeNRQ3ZU", // embed link
    category: "Technology"
  },
  { date: "2019-11-25", title: "Public Bicycle Sharing", description: "PBSS pilots in Tier II cities.", category: "Technology", image: "https://via.placeholder.com/400x300?text=Metro+2016" },
  { date: "2020-09-30", title: "COVID Urban Transport", description: "Operational safety guidelines.", category: "Technology", image: "https://via.placeholder.com/400x300?text=Metro+2016" },
  { date: "2021-03-15", title: "Transport Budget Boost", description: "More funding for e-buses and TOD.", category: "Policy", image: "https://via.placeholder.com/400x300?text=Metro+2016" },
  { date: "2022-08-18", title: "Electric Bus Procurement", description: "Policy for large-scale adoption.", category: "Governance", image: "https://via.placeholder.com/400x300?text=Metro+2016" },
  { date: "2023-05-01", title: "MaaS Pilot Launch", description: "Mobility-as-a-Service pilot programs.", category: "Infrastructure", image: "https://via.placeholder.com/400x300?text=Metro+2016" },
  { date: "2024-11-12", title: "Urban Governance Reform", description: "Capacity-building initiatives.", category: "Governance", image: "https://via.placeholder.com/400x300?text=Metro+2016"}
];
