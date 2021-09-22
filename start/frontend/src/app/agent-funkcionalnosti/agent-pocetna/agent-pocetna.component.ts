import { Component, OnInit } from '@angular/core';
import { NekretnineService } from 'src/app/nekretnine.service';
import { Router  } from '@angular/router';
import { Nekretnina } from 'src/app/model/nekretnina.model';
@Component({
  selector: 'app-agent-pocetna',
  templateUrl: './agent-pocetna.component.html',
  styleUrls: ['./agent-pocetna.component.css']
})
export class AgentPocetnaComponent implements OnInit {

  constructor(private ruter: Router,private nekretninaService: NekretnineService,) { }

  options: any;


  data1: any;
  data2: any;

  data3: any;
  data4: any;
  ngOnInit(): void {

    this.options = {
      legend: {
        display: true,
        labels: {
          fontSize: 15
        }
      },
      title: {
      },
      scales: {
        yAxes: [
          {
            display: true,
            barThickness: 5,
            scaleLabel: {
              show: false,
            },
            ticks: {
              beginAtZero: true,
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              offsetGridLines: false,
              drawBorder: false
            },
            ticks: {
              display: true,
              beginAtZero: 0
            }
          }
        ]
      }
    };

    this.nekretninaService.getNekretnine().subscribe((nekretnine: Nekretnina[]) => {

      this.preureiPoCeni(nekretnine);
      this.preurediPoGradu(nekretnine);
      this.preurediPoStanovima(nekretnine);

    });
  }
  preureiPoCeni(nekretnine: Nekretnina[]) {
    console.log(nekretnine)


    let rent_array_empty = []
    for(let i=0;i<5;i++)
      rent_array_empty.push(0)
    let rentBorders= [150, 300, 600, 1200];
    rentBorders.push(150)
    rentBorders.push(300)
    rentBorders.push(600)
    rentBorders.push(1200)
    let nizProdaja = [0, 0, 0, 0, 0]

    let graniceProdaja = [20000, 40000, 80000, 160000];

    nekretnine.forEach(nekretnina => {
      if (nekretnina.usluga == "rent") {
        for (var i = 0; i < 4; i++) {
          if (nekretnina.cena < rentBorders[i]) {
            rent_array_empty[i]++;
            return;
          }
        }
        rent_array_empty[4]++;
      }
      else if (nekretnina.usluga == "prodaja") {
        for (var i = 0; i < 4; i++) {
          if (nekretnina.cena < graniceProdaja[i]) {
            nizProdaja[i]++;
            return;
          }
        }
        nizProdaja[4]++;
      }
    })

    this.data1 = {
      labels: ["0-150 €", "150-300 €", "300-600 €", "600-1200 €", "1200€ +"],
      datasets: [
        {
          data: rent_array_empty,
          backgroundColor: 'yellow',
          label: "Stanovi rent u cenovnom rangu"
        }
      ]
    }

    this.data2 = {
      labels: ["0-20000 €", "20000-40000 €", "40000-80000 €", "80000-160000 €", "160000€ +"],
      datasets: [
        {
          data: nizProdaja,
          backgroundColor: 'blue',
          label: "Stanovi prodaja po cenovnim rangovima"
        }
      ]
    }
  }

  preurediPoGradu(nekretnine: Nekretnina[]) {
    let gradovi = [];
    let gradoviBroj = [];

    nekretnine.forEach(nekretnina => {
      for (var i = 0; i < gradovi.length; i++) {
        if (gradovi[i] == nekretnina.grad) {
          gradoviBroj[i]++;
          return;
        }
      }
      gradovi.push(nekretnina.grad);
      gradoviBroj.push(1);
    });

    this.data3 = {
      labels: gradovi,
      datasets: [
        {
          data: gradoviBroj,
          backgroundColor: 'green',
          label: "Nekretnine po gradovima"
        }
      ]
    }
  }

  preurediPoStanovima(nekretnine: Nekretnina[]) {
    let stanoviIzdavanje = 0;
    let stanoviProdaja = 0;

    let kucaIzdavanje = 0;
    let kucaProdaja = 0;

    nekretnine.forEach(nekretnina => {

      if (nekretnina.tip == "zgrada" && nekretnina.usluga == "rent") {
        stanoviIzdavanje++;
      }

      if (nekretnina.tip == "zgrada" && nekretnina.usluga == "prodaja") {
        stanoviProdaja++;
      }

      if (nekretnina.tip == "kuca" && nekretnina.usluga == "rent") {
        kucaIzdavanje++;
      }
      if (nekretnina.tip == "kuca" && nekretnina.usluga == "prodaja") {
        kucaProdaja++;
      }
    });

    this.data4 = {
      labels: ["Stanovi izdavanje", "Stanovi prodaja", "Kuce izdavanje", "Kuca prodaja"],
      datasets: [
        {
          data: [stanoviIzdavanje, stanoviProdaja, kucaIzdavanje, kucaProdaja],
          backgroundColor: 'orange',
          label: "Izdavanje / Prodaja"
        }
      ]
    }
    console.log(this.data3);
  }

}
