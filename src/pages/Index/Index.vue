<template>
  <div class="auth-page">
    <b-container>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Buscar</h3>" customHeader>
        <p class="widget-auth-info">
          Buscar na Lista de Livros
        </p>
        <form class="mt" @submit.prevent="buscar">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-search text-white"></i></b-input-group-text>
              <input id="busca"
                    v-model="busca"
                    class="form-control input-transparent pl-3"
                    type="text"
                    required
                    placeholder="Nome do Livro / Autor"/>
            </b-input-group>
            <div class="bg-widget auth-widget-footer mb-1 mt-3">
                <b-button type="submit" variant="danger" class="auth-btn" size="sm">
                    Buscar
                    <span class="auth-btn-circle">
                    <i class="la la-paper-plane"></i>
                    </span>
                </b-button>
                <b-button type="button" variant="warning" class="auth-btn" size="sm">
                    Resetar
                    <span class="auth-btn-circle">
                    <i class="la la-paper-plane"></i>
                    </span>
                </b-button>
            </div>
        </form>
      </Widget>
      <tables 
        :livros="lista"
        @anterior="anterior"
        @proximo="proximo"
        :btn_anterior="btn_anterior"
        :botoes="botoes"
      ></tables>
    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import Tables from '@/components/Tables/Tables.vue';
import axios from 'axios';

export default {
    name: 'IndexPage',
    components: { Widget, Tables },
    data() {
        return {
            busca: '',
            lista: [],
            errorMessage: null,
            pagina: 0,
            btn_anterior: true,
            botoes: true,
        };
    },
    watch: {
        pagina(value) {
            if (value == 0) {
                this.btn_anterior = true;
            } else {
                this.btn_anterior = false;
            }
        }
    },
    methods: {
        buscar() {
            var dados = { busca: this.busca};
            axios.post(this.api + 'livros', dados)
            .then((response) => {
                console.log(response)
                this.lista = response.data.livros;
                this.botoes = response.data.botoes;
            })
        },
        getLista(pagina = null){
            var complemento = '';

            if (pagina != null && pagina != 0){
                complemento = '/'+pagina;
            } 
            var rota = this.api + 'livros' + complemento;

            axios.get(rota)
            .then((response) => {
                this.lista = response.data;
            }).then((r) => {
                window.scrollTo(0, 0);
            });
        },
        proximo(){
            this.pagina ++;
            this.getLista(this.pagina);
        },
        anterior(){
            this.pagina --;

            if (this.pagina < 0) {
                this.pagina = 0;
            }
            this.getLista(this.pagina);
        }  
    },
    created() {
        this.api = this.$store.getters.getApi;    
        this.getLista();
    },
};
</script>
