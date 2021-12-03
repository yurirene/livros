<template>
  <div class="tables-basic">
    <h2 class="page-title">Lista de <span class="fw-semi-bold">Livros</span></h2>
    <b-row>
      <b-col>
        <Widget
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th class="hidden-sm-down">Editora</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, id) in lista" :key="id">
                  <td>
                    <p class="mb-0">

                    <span class="fw-semi-bold">{{row.nome}}</span>
                    </p>
                    <p>
                      <small>
                        <span class="fw-semi-bold">{{row.subtitulo}}</span>
                      </small>
                    </p>
                  </td>

                 
                  <td class="width-150">
                       {{row.autor}}
                  </td>
                 
                  <td class="width-150">
                      {{row.editora}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix">
            <div class="float-right" v-if="botoes">
              <b-button variant="default" class="mr-3" size="sm" @click="anterior"  :disabled="btn_anterior">Anterior</b-button>
              <b-button variant="default" class="mr-3" size="sm" @click="proximo">Próximo</b-button>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import Sparklines from '../../components/Sparklines/Sparklines'

export default {
    name: 'Tables',
    components: { Widget, Sparklines },
    props: {
        livros: null,
        btn_anterior: false,
        botoes: true
    },
    data() {
        return {
            lista: [],
        };
    },
    watch: {
        livros(){
            this.lista = this.livros;
        }
    },
    methods: {
        anterior() {
            this.$emit('anterior');
        },

        proximo() {
            this.$emit('proximo');
        }
    }
};
</script>

<style src="./Tables.scss" lang="scss" scoped />
