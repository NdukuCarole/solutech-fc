<template>
  <v-container fluid class="crash-page-cont">
    <v-row class="main-row-cont">
      <v-col
        v-if="screenSize === 'Large'"
        cols="12"
        md="3"
        sm="12"
        class="chat-column"
      >
        <v-card class="mx-auto bets-card" variant="outlined">
          <v-card-item sm="12">
            <div class="btn-div">
              <v-btn
                :class="
                  allBets ? 'active-bet-btn text-none' : 'text-none bet-btn'
                "
                size="small"
                rounded
                @click="displayAllBets()"
                flat
                plain
                variant="outlined"
              >
                <span class="bet-btn-txt">All Bets</span>
              </v-btn>
              <v-btn
                v-if="isLoggedIn"
                :class="
                  myBets ? 'active-bet-btn text-none' : 'text-none bet-btn'
                "
                size="small"
                rounded
                flat
                @click="displayMyBets()"
                plain
                variant="outlined"
              >
                <span class="bet-btn-txt">My Bets</span>
              </v-btn>

              <v-btn
                :class="
                  topBets ? 'active-bet-btn text-none' : 'text-none bet-btn'
                "
                size="small"
                rounded
                flat
                @click="displayTopBets()"
                plain
                variant="outlined"
              >
                <span class="bet-btn-txt">Top</span>
              </v-btn>
            </div>

            <!-- All Bets div -->
            <div v-if="allBets">
              <v-row
                ><v-col>
                  <div class="bets-text-div">
                    <span class="bet-txt">ALL BETS</span>
                    <p class="bet-txt mt-n1">839</p>
                  </div> </v-col
                ><v-col>
                  <div class="right-bets-text-div">
                    <v-btn
                      class="text-none bet-btn mt-2"
                      size="small"
                      rounded
                      density="compact"
                      flat
                      plain
                      variant="outlined"
                    >
                      <span class="bet-btn-txt">
                        <v-icon
                          icon="mdi-history"
                          color="green"
                          size="12"
                        ></v-icon
                        >Previous hand</span
                      >
                    </v-btn>
                  </div></v-col
                ></v-row
              >
            </div>
          </v-card-item>

          <!-- All Bets div -->

          <v-card-item class="mt-n3" v-if="allBets">
            <v-list class="large-list-column">
              <v-row class="ml-0"
                ><v-col cols="2">
                  <span class="first-col-text">User</span></v-col
                >
                <v-col cols="3">
                  <span class="first-col-text ml-2">Amount</span>
                </v-col>
                <v-col cols="2">
                  <span class="first-col-text ml-2">Odd</span>
                </v-col>
                <v-col cols="2">
                  <span class="first-col-text ml-2">Bust</span>
                </v-col>
                <v-col cols="3">
                  <span class="first-col-text">Won</span></v-col
                ></v-row
              >

              <v-list-item v-for="(item, i) in liveBets" :key="i">
                <div :class="item.bet_outcome === 1 ? 'list-row' : ''">
                  <v-row class="">
                    <v-col class="user-name column-align mt-1" md="3">
                      <v-avatar size="20px">
                        <v-img
                          alt="Avatar"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        ></v-img>
                      </v-avatar>

                      <span class="num-style">{{ item.username }}</span></v-col
                    >
                    <v-col class="message-body mt-1" md="2">
                      {{ item.bet_amount }}
                    </v-col>
                    <v-col class="message-body mt-1" md="2">
                      <v-chip size="x-small" class="chip-color" color="green">
                        <span class="crash-number mr-1">{{
                          item.user_crash + "x"
                        }}</span>
                      </v-chip></v-col
                    >
                    <v-col class="message-body mt-1" md="2">
                      <v-chip
                        class="chip-color"
                        size="x-small"
                        v-if="item.bet_outcome === 1"
                      >
                        <span
                          class="crash-number mr-1"
                          :style="{
                            color: getColorForNumber(item.crash_point),
                          }"
                          >{{ item.crash_point + "x" }}</span
                        >
                      </v-chip></v-col
                    >

                    <v-col class="message-body mt-1" md="3">
                      {{
                        item.win_amount === 0 ? "--" : item.win_amount
                      }}</v-col
                    >
                  </v-row>
                </div></v-list-item
              ></v-list
            >
          </v-card-item>

          <v-card-item class="mt-n3" v-if="myBets">
            <v-list class="large-list-column">
              <v-row class="ml-0"
                ><v-col cols="2">
                  <span class="first-col-text">User</span></v-col
                >
                <v-col cols="3">
                  <span class="first-col-text ml-2">Amount</span>
                </v-col>
                <v-col cols="2">
                  <span class="first-col-text ml-2">Odd</span>
                </v-col>
                <v-col cols="2">
                  <span class="first-col-text ml-2">Bust</span>
                </v-col>
                <v-col cols="3">
                  <span class="first-col-text">Won</span></v-col
                ></v-row
              >

              <v-list-item v-for="(item, i) in liveMyBets" :key="i">
                <div :class="item.bet_outcome === 1 ? 'list-row' : ''">
                  <v-row class="">
                    <v-col class="user-name column-align mt-1" md="3">
                      <v-avatar size="20px">
                        <v-img
                          alt="Avatar"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        ></v-img>
                      </v-avatar>

                      <span class="num-style">{{ item.username }}</span></v-col
                    >
                    <v-col class="message-body mt-1" md="2">
                      {{ item.bet_amount }}
                    </v-col>
                    <v-col class="message-body mt-1" md="2">
                      <v-chip class="chip-color" size="x-small" color="green">
                        <span class="crash-number">{{
                          item.user_crash + "x"
                        }}</span>
                      </v-chip></v-col
                    >
                    <v-col class="message-body mt-1" md="2">
                      <v-chip
                        class="chip-color"
                        size="x-small"
                        v-if="item.bet_outcome === 1"
                      >
                        <span
                          class="crash-number"
                          :style="{
                            color: getColorForNumber(item.crash_point),
                          }"
                          >{{ item.crash_point + "x" }}</span
                        >
                      </v-chip></v-col
                    >

                    <v-col class="message-body mt-1" md="3">
                      {{
                        item.win_amount === 0 ? "--" : item.win_amount
                      }}</v-col
                    >
                  </v-row>
                </div></v-list-item
              ></v-list
            >
          </v-card-item>

          <v-card-item class="mt-n3" v-if="topBets">
            <v-row
              ><v-col></v-col>
              <v-col
                ><v-icon
                  icon="mdi-checkbox-blank-circle"
                  color="green"
                  size="8"
                ></v-icon>
                <span class="online-text"></span>
              </v-col>
              <v-col></v-col
            ></v-row>

            <v-list class="large-list-column">
              <v-row class="ml-0"
                ><v-col cols="2">
                  <span class="first-col-text">User</span></v-col
                >
                <v-col cols="3">
                  <span class="first-col-text ml-2">Amount</span>
                </v-col>
                <v-col cols="2">
                  <span class="first-col-text ml-2">Odd</span>
                </v-col>
                <v-col cols="2">
                  <span class="first-col-text ml-2">Bust</span>
                </v-col>
                <v-col cols="3">
                  <span class="first-col-text">Won</span></v-col
                ></v-row
              >

              <v-list-item v-for="(item, i) in TopWinningBets" :key="i">
                <div :class="item.bet_outcome === 1 ? 'list-row' : ''">
                  <v-row class="">
                    <v-col class="user-name column-align mt-1" md="2">
                      <v-avatar size="20px">
                        <v-img
                          alt="Avatar"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        ></v-img>
                      </v-avatar>

                      <span class="num-style">{{ item.username }}</span></v-col
                    >
                    <v-col class="message-body mt-1" md="3">
                      {{ item.bet_amount }}
                    </v-col>
                    <v-col class="message-body mt-1" md="2">
                      <v-chip class="chip-color" size="x-small" color="green">
                        <span class="crash-number">{{
                          item.user_crash + "x"
                        }}</span>
                      </v-chip></v-col
                    >
                    <v-col class="message-body mt-1" md="2">
                      <v-chip
                        class="chip-color"
                        size="x-small"
                        v-if="item.bet_outcome === 1"
                      >
                        <span
                          class="crash-number"
                          :style="{
                            color: getColorForNumber(item.crash_point),
                          }"
                          >{{ item.crash_point + "x" }}</span
                        >
                      </v-chip></v-col
                    >

                    <v-col class="message-body mt-1" md="3">
                      {{
                        item.win_amount === 0 ? "--" : item.win_amount
                      }}</v-col
                    >
                  </v-row>
                </div></v-list-item
              ></v-list
            >
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" :class="isLoggedIn ? 'mt-n1' : 'mt-3'">
        <v-row v-if="screenSize === 'Large'" justify="center" class="mx-auto">
          <v-card
            v-if="isLoggedIn && liveMyBets.length !== 0"
            color="#1b1c1d"
            class="mx-auto crash-points-card mt-1"
            justify="center"
            variant="outlined"
          >
            <v-chip
              class="chip-color mx-2 mt-1"
              size="small"
              :style="{
                color: getColorForNumber(item.crash_point),
              }"
              v-for="(item, i) in liveMyBets.slice(0, 16)"
              :key="i"
            >
              <span
                class="crash-number"
                :style="{
                  color: getColorForNumber(item.crash_point),
                }"
                >{{ item.crash_point + "x" }}</span
              >
            </v-chip></v-card
          >
          <v-card
            color="#1b1c1d"
            class="mx-auto crash-points-card mt-0"
            justify="center"
            variant="outlined"
            v-if="isLoggedIn && liveMyBets.length === 0"
          >
            <span class="text-white">Your bets will appear here</span>
          </v-card>
        </v-row>
        <v-row class="mt-0" v-if="screenSize === 'Large'">
          <v-col class="graph-col">
            <div>
              <div>
                <v-card
                  :class="
                    screenSize === 'Large'
                      ? 'mx-auto graph-card'
                      : ' small-graph-card'
                  "
                  variant="outlined"
                >
                  <div>
                    <div class="betting-text">
                      <h4 class="green-text" v-if="isCounterRunning">
                        <span
                          :class="
                            screenSize === 'Large'
                              ? 'multi-text '
                              : 'small-multi-text'
                          "
                          >{{ counter }} x</span
                        >
                      </h4>

                      <h4
                        class="text-red"
                        v-if="!isCounterRunning && crashPoint !== 0"
                      >
                        <span class="multi-text">{{ crashPoint }} x</span>
                      </h4>
                      <h4 v-if="!isCounterRunning && crashPoint === 0">
                        <span class="multi-text mt-6">
                          {{ defcounter }}.00 x</span
                        >
                      </h4>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" v-if="screenSize === 'Small'">
          <v-card
            color="#1b1c1d"
            class="crash-points-card"
            justify="center"
            variant="outlined"
            v-if="isLoggedIn && liveMyBets.length !== 0"
          >
            <v-chip
              class="chip-color mx-2"
              size="x-small"
              :style="{
                color: getColorForNumber(item.crash_point),
              }"
              v-for="(item, i) in liveMyBets.slice(0, 5)"
              :key="i"
            >
              <span
                class="crash-number"
                :style="{
                  color: getColorForNumber(item.crash_point),
                }"
                >{{ item.crash_point + "x" }}</span
              >
            </v-chip></v-card
          >
          <v-card
            color="#1b1c1d"
            class="mx-auto crash-points-card mt-0"
            justify="center"
            variant="outlined"
            v-if="isLoggedIn && liveMyBets.length === 0"
          >
            <span class="text-white">Your bets will appear here</span>
          </v-card>
        </v-row>
        <v-row class="" v-if="screenSize === 'Small'">
          <v-col
            cols="12"
            md="8"
            sm="12"
            :class="screenSize === 'Large' ? 'graph-col' : 'small-graph-col'"
          >
            <div>
              <div>
                <v-card
                  :class="
                    screenSize === 'Large'
                      ? 'mx-auto graph-card'
                      : ' small-graph-card'
                  "
                  variant="outlined"
                >
                  <div>
                    <div class="betting-text">
                      <h4 class="green-text" v-if="isCounterRunning">
                        <span
                          :class="
                            screenSize === 'Large'
                              ? 'multi-text '
                              : 'small-multi-text'
                          "
                          >{{ counter }} x</span
                        >
                      </h4>

                      <h4
                        class="text-red"
                        v-if="!isCounterRunning && crashPoint !== 0"
                      >
                        <span
                          :class="
                            screenSize === 'Large'
                              ? 'multi-text '
                              : 'small-multi-text'
                          "
                          >{{ crashPoint }} x</span
                        >
                      </h4>
                      <h4 v-if="!isCounterRunning && crashPoint === 0">
                        <span
                          :class="
                            screenSize === 'Large'
                              ? 'multi-text '
                              : 'small-multi-text'
                          "
                        >
                          {{ defcounter }}.00 x</span
                        >
                      </h4>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="12"
            :class="screenSize === 'Large' ? ' mt-2' : 'small-bet-col mt-2'"
          >
            <v-row>
              <!-- adding bet buttons -->
              <v-col cols="5">
                <v-btn
                  class="text-none add-bet-btn pa-1 mx-auto mt-3 mx-auto"
                  size="small"
                  rounded
                  flat
                  plain
                  variant="outlined"
                >
                  <v-icon
                    color="white"
                    class="mt-n1 ml-6"
                    @click="reduceBetAmt()"
                    >mdi-minus-circle-outline</v-icon
                  >
                  <span class="amount-bet">
                    <input
                      ref="numberInput"
                      v-on:input="validateInput"
                      class="new-outline mt-n2"
                      v-model="defAmt"
                      type="number"
                      min="0"
                  /></span>
                  <v-icon color="white" class="mt-n1 mr-6" @click="addBetAmt()"
                    >mdi-plus-circle-outline
                  </v-icon>
                </v-btn>

                <!-- amount buttons -->
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      class="text-none chip-bet-btn mt-2 ml-2"
                      size="x-small"
                      rounded
                      flat
                      plain
                      @click="addOneDefAmt()"
                      variant="outlined"
                    >
                      <span class="bet-btn-txt">100</span>
                    </v-btn>
                    <v-btn
                      class="text-none chip-bet-btn mt-2 ml-2"
                      size="x-small"
                      rounded
                      @click="addTwoDefAmt()"
                      flat
                      plain
                      variant="outlined"
                    >
                      <span class="bet-btn-txt">200</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      class="text-none chip-bet-btn mt-2 ml-2"
                      size="x-small"
                      rounded
                      flat
                      @click="addFiveDefAmt()"
                      plain
                      variant="outlined"
                    >
                      <span class="bet-btn-txt">500</span>
                    </v-btn>
                    <v-btn
                      class="text-none chip-bet-btn mt-2 ml-2"
                      size="x-small"
                      rounded
                      flat
                      @click="addOneThDefAmt()"
                      plain
                      variant="outlined"
                    >
                      <span class="bet-btn-txt">1000</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="7" class="mx-auto mt-0" v-if="isLoggedIn">
                <v-btn
                  v-if="!playing"
                  height="70"
                  width="400"
                  class="green-card mt-4"
                  @click="handleButtonClick()"
                >
                  BET<br />
                  {{ defAmt }}.00 KES</v-btn
                >
                <v-btn
                  v-if="playing"
                  height="70"
                  width="400"
                  class="orange-card mt-4"
                >
                  BET<br />
                  {{ defAmt }}.00 KES</v-btn
                >
              </v-col>
              <v-col cols="7" class="mx-auto mt-0" v-if="!isLoggedIn">
                <v-btn
                  height="70"
                  width="400"
                  :disabled="playing"
                  class="orange-card mt-4"
                  @click="openLoginDialog()"
                >
                  BET<br />
                  {{ defAmt }}.00 KES</v-btn
                >
              </v-col></v-row
            >
            <v-row justify="center" class="mt-1">
              <span class="text-white mt-3"> CashOut</span>
            </v-row>

            <v-row justify="center" class="mb-4">
              <div class="input-container">
                <input
                  v-on:input="validateBetInput"
                  class="red-outline mx-3 ml-5"
                  v-model="bet_mlt"
                  type="text"
                />
                <span class="clear-button">x</span>
              </div>
            </v-row>
            <!-- </v-card> -->
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-if="screenSize === 'Small'"
            cols="12"
            md="3"
            sm="12"
            class="small-chat-column"
          >
            <v-card class="mx-auto bets-card" variant="outlined">
              <v-card-item sm="12">
                <div class="btn-div">
                  <v-btn
                    :class="
                      allBets ? 'active-bet-btn text-none' : 'text-none bet-btn'
                    "
                    size="small"
                    rounded
                    @click="displayAllBets()"
                    flat
                    plain
                    variant="outlined"
                  >
                    <span class="bet-btn-txt">All Bets</span>
                  </v-btn>
                  <v-btn
                    v-if="isLoggedIn"
                    :class="
                      myBets ? 'active-bet-btn text-none' : 'text-none bet-btn'
                    "
                    size="small"
                    rounded
                    flat
                    @click="displayMyBets()"
                    plain
                    variant="outlined"
                  >
                    <span class="bet-btn-txt">My Bets</span>
                  </v-btn>
                  <v-btn
                    :class="
                      allChats
                        ? 'active-bet-btn text-none'
                        : 'text-none bet-btn'
                    "
                    size="small"
                    rounded
                    flat
                    plain
                    @click="displayChats()"
                    variant="outlined"
                  >
                    <span class="bet-btn-txt">Chat</span>
                  </v-btn>
                  <v-btn
                    :class="
                      topBets ? 'active-bet-btn text-none' : 'text-none bet-btn'
                    "
                    size="small"
                    rounded
                    flat
                    @click="displayTopBets()"
                    plain
                    variant="outlined"
                  >
                    <span class="bet-btn-txt">Top</span>
                  </v-btn>
                </div>

                <!-- All Bets div -->
                <div v-if="allBets">
                  <v-row
                    ><v-col>
                      <div class="bets-text-div">
                        <span class="bet-txt">ALL BETS</span>
                        <p class="bet-txt mt-n1">839</p>
                      </div> </v-col
                    ><v-col>
                      <div class="right-bets-text-div">
                        <v-btn
                          class="text-none bet-btn mt-2"
                          size="small"
                          rounded
                          density="compact"
                          flat
                          plain
                          variant="outlined"
                        >
                          <span class="bet-btn-txt">
                            <v-icon
                              icon="mdi-history"
                              color="green"
                              size="12"
                            ></v-icon
                            >Previous hand</span
                          >
                        </v-btn>
                      </div></v-col
                    ></v-row
                  >
                </div>
              </v-card-item>

              <!-- All Bets div -->

              <v-card-item class="mt-n3" v-if="allBets">
                <v-list class="first-list-column">
                  <v-row class="ml-0"
                    ><v-col cols="3">
                      <span class="first-col-text ml-3">User</span></v-col
                    >
                    <v-col cols="3">
                      <span class="first-col-text ml-n5">Amount</span>
                    </v-col>
                    <v-col cols="2">
                      <span class="first-col-text ml-n6">X</span>
                    </v-col>
                    <v-col cols="2">
                      <span class="first-col-text ml-n8">Bust</span></v-col
                    >
                    <v-col cols="2">
                      <span class="first-col-text ml-n6">Won</span></v-col
                    ></v-row
                  >

                  <v-list-item v-for="(item, i) in liveBets" :key="i">
                    <div :class="item.bet_outcome === 1 ? 'list-row' : ''">
                      <v-row class="">
                        <v-col
                          class="small-user-name column-align mt-1"
                          cols="2"
                        >
                          <v-avatar size="20px">
                            <v-img
                              alt="Avatar"
                              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                            ></v-img>
                          </v-avatar>

                          <span class="small-num-style mt-1">{{
                            item.username
                          }}</span></v-col
                        >
                        <v-col class="small-message-body mt-2" cols="3">
                          <span class="ml-5 mt-1">{{ item.bet_amount }}</span>
                        </v-col>
                        <v-col class="small-message-body mt-2" cols="2">
                          <!-- <v-chip
                            class="chip-color"
                            size="x-small"
                            color="green"
                          > -->
                          <span class="small-crash-number">{{
                            item.user_crash + "x"
                          }}</span>
                          <!-- </v-chip> -->
                        </v-col>
                        <v-col class="small-message-body mt-2" cols="2">
                          <!-- <v-chip
                            class="chip-color
                            size="x-small"
                            v-if="item.bet_outcome === 1"
                          > -->
                          <span
                            v-if="item.bet_outcome === 1"
                            class="crash-number mt-2"
                            :style="{
                              color: getColorForNumber(item.crash_point),
                            }"
                            >{{ item.crash_point + "x" }}</span
                          >
                          <!-- </v-chip> -->
                        </v-col>

                        <v-col class="small-message-body mt-2 ml-0" cols="3">
                          <span class="ml-5">
                            {{
                              item.win_amount === 0 ? "--" : item.win_amount
                            }}</span
                          >
                        </v-col>
                      </v-row>
                    </div></v-list-item
                  ></v-list
                >
              </v-card-item>

              <v-card-item class="mt-n3" v-if="myBets">
                <v-list class="first-list-column">
                  <v-row class="ml-0"
                    ><v-col cols="3">
                      <span class="first-col-text ml-3">User</span></v-col
                    >
                    <v-col cols="3">
                      <span class="first-col-text ml-n5">Amount</span>
                    </v-col>
                    <v-col cols="2">
                      <span class="first-col-text ml-n6">X</span>
                    </v-col>
                    <v-col cols="2">
                      <span class="first-col-text ml-n8">Bust</span></v-col
                    >
                    <v-col cols="2">
                      <span class="first-col-text ml-n6">Won</span></v-col
                    ></v-row
                  >

                  <v-list-item v-for="(item, i) in liveMyBets" :key="i">
                    <div :class="item.bet_outcome === 1 ? 'list-row' : ''">
                      <v-row class="">
                        <v-col
                          class="small-user-name column-align mt-1"
                          cols="2"
                        >
                          <v-avatar size="20px">
                            <v-img
                              alt="Avatar"
                              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                            ></v-img>
                          </v-avatar>

                          <span class="small-num-style mt-1">{{
                            item.username
                          }}</span></v-col
                        >
                        <v-col class="small-message-body mt-2" cols="3">
                          <span class="ml-5 mt-1">{{ item.bet_amount }}</span>
                        </v-col>
                        <v-col class="small-message-body mt-2" cols="2">
                          <!-- <v-chip
                            class="chip-color"
                            size="x-small"
                            color="green"
                          > -->
                          <span class="small-crash-number">{{
                            item.user_crash + "x"
                          }}</span>
                          <!-- </v-chip> -->
                        </v-col>
                        <v-col class="small-message-body mt-2" cols="2">
                          <!-- <v-chip
                            class="chip-color
                            size="x-small"
                            v-if="item.bet_outcome === 1"
                          > -->
                          <span
                            v-if="item.bet_outcome === 1"
                            class="crash-number mt-2"
                            :style="{
                              color: getColorForNumber(item.crash_point),
                            }"
                            >{{ item.crash_point + "x" }}</span
                          >
                          <!-- </v-chip> -->
                        </v-col>

                        <v-col class="small-message-body mt-2 ml-0" cols="3">
                          <span class="ml-5">
                            {{
                              item.win_amount === 0 ? "--" : item.win_amount
                            }}</span
                          >
                        </v-col>
                      </v-row>
                    </div>
                  </v-list-item></v-list
                >
              </v-card-item>

              <v-card-item class="mt-n3" v-if="topBets">
                <v-list class="first-list-column">
                  <v-row class="ml-0"
                    ><v-col cols="3">
                      <span class="first-col-text ml-3">User</span></v-col
                    >
                    <v-col cols="3">
                      <span class="first-col-text ml-n5">Amount</span>
                    </v-col>
                    <v-col cols="2">
                      <span class="first-col-text ml-n6">X</span>
                    </v-col>
                    <v-col cols="2">
                      <span class="first-col-text ml-n8">Bust</span></v-col
                    >
                    <v-col cols="2">
                      <span class="first-col-text ml-n6">Won</span></v-col
                    ></v-row
                  >

                  <v-list-item v-for="(item, i) in TopWinningBets" :key="i">
                    <div :class="item.bet_outcome === 1 ? 'list-row' : ''">
                      <v-row class="">
                        <v-col
                          class="small-user-name column-align mt-1"
                          cols="2"
                        >
                          <v-avatar size="20px">
                            <v-img
                              alt="Avatar"
                              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                            ></v-img>
                          </v-avatar>

                          <span class="small-num-style mt-1">{{
                            item.username
                          }}</span></v-col
                        >
                        <v-col class="small-message-body mt-2" cols="3">
                          <span class="ml-5 mt-1">{{ item.bet_amount }}</span>
                        </v-col>
                        <v-col class="small-message-body mt-2" cols="2">
                          <!-- <v-chip
                            class="chip-color"
                            size="x-small"
                            color="green"
                          > -->
                          <span class="small-crash-number">{{
                            item.user_crash + "x"
                          }}</span>
                          <!-- </v-chip> -->
                        </v-col>
                        <v-col class="small-message-body mt-2" cols="2">
                          <!-- <v-chip
                            class="chip-color
                            size="x-small"
                            v-if="item.bet_outcome === 1"
                          > -->
                          <span
                            v-if="item.bet_outcome === 1"
                            class="crash-number mt-2"
                            :style="{
                              color: getColorForNumber(item.crash_point),
                            }"
                            >{{ item.crash_point + "x" }}</span
                          >
                          <!-- </v-chip> -->
                        </v-col>

                        <v-col class="small-message-body mt-2 ml-0" cols="3">
                          <span class="ml-5">
                            {{
                              item.win_amount === 0 ? "--" : item.win_amount
                            }}</span
                          >
                        </v-col>
                      </v-row>
                    </div></v-list-item
                  ></v-list
                >
              </v-card-item>

              <!-- All Chats div -->
              <v-card-item v-if="allChats">
                <v-list
                  class="first-chat-list-column"
                  ref="smallChatsCol"
                  id="third-chats-col"
                >
                  <v-row
                    ><v-col></v-col>
                    <v-col
                      ><v-icon
                        icon="mdi-checkbox-blank-circle"
                        color="green"
                        size="8"
                      ></v-icon>
                      <span class="online-text">3032</span>
                    </v-col>
                    <v-col></v-col
                  ></v-row>

                  <v-list-item v-for="(item, i) in liveChats" :key="i">
                    <v-row>
                      <v-col class="user-name column-align" md="3">
                        <v-avatar size="20px">
                          <v-img
                            alt="Avatar"
                            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                          ></v-img>
                        </v-avatar>

                        <span class="small-num-style">{{
                          item.username
                        }}</span></v-col
                      >
                      <v-col class="small-message-body" md="7">
                        {{ item.message }}</v-col
                      >
                      <v-col class="time-name">
                        <v-icon
                          icon="mdi-thumb-up-outline"
                          size="x-small"
                        ></v-icon>
                      </v-col>
                    </v-row> </v-list-item
                ></v-list>
                <v-divider class="divider" />
                <v-row v-if="isLoggedIn">
                  <v-col cols="9">
                    <v-text-field
                      label="Reply"
                      outlined
                      v-model="ChatMessage"
                      class="custom-label-color"
                      placeholder="Reply"
                      variant="plain"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3" class="mt-3">
                    <v-icon @click="sendMessage()" color="white"
                      >mdi-send</v-icon
                    ></v-col
                  >
                </v-row>
              </v-card-item>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="12"
            class="mt-0"
            v-if="screenSize === 'Large'"
          >
            <v-card class="mx-auto large-bets-card">
              <v-row v-if="screenSize === 'Large'">
                <v-col class="main-column mx-auto mt-6" cols="12" md="5">
                  <v-row v-if="screenSize === 'Large'">
                    <!-- adding bet buttons -->
                    <v-col cols="5" class="mt-n4">
                      <v-btn
                        class="text-none add-bet-btn pa-1 mx-auto mt-3 mx-auto"
                        size="small"
                        rounded
                        flat
                        plain
                        variant="outlined"
                      >
                        <v-icon
                          color="white"
                          class="mt-n1 ml-6"
                          @click="reduceBetAmt()"
                          >mdi-minus-circle-outline</v-icon
                        >
                        <span class="amount-bet">
                          <input
                            ref="numberInput"
                            v-on:input="validateInput"
                            class="new-outline mt-n2"
                            v-model="defAmt"
                            type="number"
                            min="0"
                        /></span>
                        <v-icon
                          color="white"
                          class="mt-n1 mr-6"
                          @click="addBetAmt()"
                          >mdi-plus-circle-outline
                        </v-icon>
                      </v-btn>

                      <!-- amount buttons -->
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-btn
                            class="text-none chip-bet-btn mt-2"
                            size="x-small"
                            rounded
                            flat
                            @click="addOneDefAmt()"
                            plain
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">100</span>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-btn
                            class="text-none chip-bet-btn mt-2"
                            size="x-small"
                            rounded
                            flat
                            @click="addTwoDefAmt()"
                            plain
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">200</span>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n3">
                          <v-btn
                            class="text-none chip-bet-btn mt-n3"
                            size="x-small"
                            rounded
                            flat
                            @click="addFiveDefAmt()"
                            plain
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">500</span>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n3">
                          <v-btn
                            class="text-none chip-bet-btn mt-n3"
                            size="x-small"
                            rounded
                            flat
                            plain
                            @click="addOneThDefAmt()"
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">1000</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- bet button -->
                    <v-col cols="6" class="mx-auto mt-n4" v-if="isLoggedIn">
                      <v-btn
                        v-if="!playing"
                        height="70"
                        width="400"
                        class="green-card mt-4"
                        @click="handleButtonClick()"
                      >
                        BET<br />
                        {{ defAmt }}.00 KES</v-btn
                      >
                      <v-btn
                        v-if="playing"
                        height="70"
                        width="400"
                        class="orange-card mt-4"
                      >
                        BET<br />
                        {{ defAmt }}.00 KES</v-btn
                      >
                    </v-col>
                    <v-col cols="6" class="mx-auto mt-n4" v-if="!isLoggedIn">
                      <v-btn
                        height="70"
                        width="400"
                        :disabled="playing"
                        class="orange-card mt-4"
                        @click="openLoginDialog()"
                      >
                        BET<br />
                        {{ defAmt }}.00 KES</v-btn
                      >
                    </v-col></v-row
                  >

                  <!-- betting area for adding multiplier -->
                  <v-row
                    v-if="screenSize === 'Large'"
                    justify="center"
                    class="mb-3 mt-n3"
                  >
                    <div class="input-container">
                      <input
                        v-on:input="validateBetInput"
                        class="red-outline mx-3 ml-5"
                        v-model="bet_mlt"
                        type="text"
                      />
                      <span class="clear-button">x</span>
                    </div>
                  </v-row>
                </v-col>
                <v-col class="main-column mx-auto mt-6" cols="12" md="5">
                  <v-row v-if="screenSize === 'Large'">
                    <!-- adding bet buttons -->
                    <v-col cols="5" class="mt-n4">
                      <v-btn
                        class="text-none add-bet-btn pa-1 mx-auto mt-3 mx-auto"
                        size="small"
                        rounded
                        flat
                        plain
                        variant="outlined"
                      >
                        <v-icon
                          color="white"
                          class="mt-n1 ml-6"
                          @click="reduceBetAmt()"
                          >mdi-minus-circle-outline</v-icon
                        >
                        <span class="amount-bet">
                          <input
                            ref="numberInput"
                            v-on:input="validateInput"
                            class="new-outline mt-n2"
                            v-model="defAmt"
                            type="number"
                            min="0"
                        /></span>
                        <v-icon
                          color="white"
                          class="mt-n1 mr-6"
                          @click="addBetAmt()"
                          >mdi-plus-circle-outline
                        </v-icon>
                      </v-btn>

                      <!-- amount buttons -->
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-btn
                            class="text-none chip-bet-btn mt-2"
                            size="x-small"
                            rounded
                            flat
                            @click="addOneDefAmt()"
                            plain
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">100</span>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-btn
                            class="text-none chip-bet-btn mt-2"
                            size="x-small"
                            rounded
                            flat
                            @click="addTwoDefAmt()"
                            plain
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">200</span>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n3">
                          <v-btn
                            class="text-none chip-bet-btn mt-n3"
                            size="x-small"
                            rounded
                            flat
                            @click="addFiveDefAmt()"
                            plain
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">500</span>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n3">
                          <v-btn
                            class="text-none chip-bet-btn mt-n3"
                            size="x-small"
                            rounded
                            flat
                            plain
                            @click="addOneThDefAmt()"
                            variant="outlined"
                          >
                            <span class="bet-btn-txt">1000</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- bet button -->
                    <v-col cols="6" class="mx-auto mt-n4" v-if="isLoggedIn">
                      <v-btn
                        v-if="!playing"
                        height="70"
                        width="400"
                        class="green-card mt-4"
                        @click="handleButtonClick()"
                      >
                        BET<br />
                        {{ defAmt }}.00 KES</v-btn
                      >
                      <v-btn
                        v-if="playing"
                        height="70"
                        width="400"
                        class="orange-card mt-4"
                      >
                        BET<br />
                        {{ defAmt }}.00 KES</v-btn
                      >
                    </v-col>
                    <v-col cols="6" class="mx-auto mt-n4" v-if="!isLoggedIn">
                      <v-btn
                        height="70"
                        width="400"
                        :disabled="playing"
                        class="orange-card mt-4"
                        @click="openLoginDialog()"
                      >
                        BET<br />
                        {{ defAmt }}.00 KES</v-btn
                      >
                    </v-col></v-row
                  >

                  <!-- betting area for adding multiplier -->
                  <v-row
                    v-if="screenSize === 'Large'"
                    justify="center"
                    class="mb-3 mt-n3"
                  >
                    <div class="input-container">
                      <input
                        v-on:input="validateBetInput"
                        class="red-outline mx-3 ml-5"
                        v-model="bet_mlt"
                        type="text"
                      />
                      <span class="clear-button">x</span>
                    </div>
                  </v-row>
                </v-col></v-row
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="chat-column"
        md="3"
        sm="12"
        v-if="screenSize === 'Large'"
      >
        <v-list class="list-column" id="second-chats-col">
          <v-row
            ><v-col></v-col>
            <v-col>
              <!-- <v-icon
                icon="mdi-checkbox-blank-circle"
                color="green"
                size="8"
              ></v-icon> -->
              <!-- <span class="online-text"></span> -->
            </v-col>
            <v-col></v-col
          ></v-row>

          <v-list-item v-for="(item, i) in liveChats" :key="i">
            <v-row>
              <v-col class="user-name column-align" md="3">
                <v-avatar size="20px">
                  <v-img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  ></v-img>
                </v-avatar>

                <span class="num-style">{{ item.username }}</span></v-col
              >
              <v-col class="message-body" md="7"> {{ item.message }}</v-col>
              <v-col class="time-name">
                <v-icon icon="mdi-thumb-up-outline" size="x-small"></v-icon>
              </v-col>
            </v-row> </v-list-item
        ></v-list>
        <v-divider class="divider" />
        <v-row v-if="isLoggedIn">
          <v-col cols="9">
            <v-text-field
              label="Reply"
              outlined
              v-model="ChatMessage"
              class="custom-label-color ml-4"
              placeholder="Reply"
              variant="plain"
            ></v-text-field
          ></v-col>
          <v-col cols="3" class="mt-3">
            <v-icon @click="sendMessage()" color="white"
              >mdi-send</v-icon
            ></v-col
          >
        </v-row>
      </v-col>
    </v-row>

    <!-- login dialog -->
    <v-dialog v-model="dialog" persistent width="800px">
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
          <v-card tile dark class="login-card">
            <v-card-title class="white--text">
              <v-row v-if="alertMessage.status !== ''">
                <v-col class="d-flex justify-end">
                  <v-btn
                    @click="closeLoginDialog()"
                    class="ml-6 mt-n4"
                    size="x-large"
                    variant="text"
                    icon="mdi-close-circle"
                    color="red-darken-2"
                  ></v-btn
                ></v-col>
              </v-row>
              <!-- snackbar -->
              <v-alert
                dense
                v-if="alertMessage.status !== ''"
                :type="alertMessage.status === 'success' ? 'success' : 'error'"
              >
                <span class="pass-text">{{ alertMessage.message }}</span>
              </v-alert>
              <v-row>
                <v-col class="mt-2 text--white"> Login to account</v-col>
                <v-col> </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn
                    v-if="alertMessage.status === ''"
                    @click="closeLoginDialog()"
                    class="ml-6"
                    size="x-large"
                    variant="text"
                    icon="mdi-close-circle"
                    color="red-darken-2"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text class="mt-5">
              <v-form ref="loginForm" v-model="isValid">
                <!--User name-->
                <v-text-field
                  ref="phone"
                  label="phone"
                  :rules="rules.required"
                  v-model="formData.phone"
                  outlined
                  placeholder="Enter phone"
                />

                <!-- Password -->
                <v-text-field
                  ref="password"
                  :rules="rules.required"
                  label="Password"
                  v-model="formData.password"
                  outlined
                  placeholder="Enter Password"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="mt-n6">
              <v-btn class="text-lowercase text-decoration-underline" text>
                Forgot password?</v-btn
              >
            </v-card-actions>

            <v-card-actions class="mt-n6">
              <v-spacer />
              <v-btn color="primary" class="login-btn" @click="Login()">
                Login
              </v-btn>
              <v-spacer />
            </v-card-actions>

            <v-card-actions class="">
              <v-col cols="12" class="justify-center">
                <p class="text-center overline grey--text">
                  dont have an account?
                </p>
                <v-btn
                  class="register-btn"
                  block
                  @click="openCloseRegisterDialog()"
                >
                  register
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

    <!-- register dialog -->
    <v-dialog v-model="registerDialog" persistent width="800px">
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
          <v-card tile dark class="login-card">
            <v-card-title class="white--text">
              <v-row v-if="alertMessage.status !== ''">
                <v-col class="d-flex justify-end">
                  <v-btn
                    @click="closeLoginDialog()"
                    class="ml-6 mt-n4"
                    size="x-large"
                    variant="text"
                    icon="mdi-close-circle"
                    color="red-darken-2"
                  ></v-btn
                ></v-col>
              </v-row>
              <v-alert
                dense
                v-if="alertMessage.status !== ''"
                :type="alertMessage.status === 'success' ? 'success' : 'error'"
              >
                <span class="pass-text">{{ alertMessage.message }}</span>
              </v-alert>
              <v-row>
                <v-col class="mt-2 text--white"> Register</v-col>
                <v-col> </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn
                    v-if="alertMessage.status === ''"
                    @click="closeRegisterDialog()"
                    class="ml-6"
                    variant="text"
                    icon="mdi-close-circle"
                    color="red-darken-2"
                  ></v-btn
                ></v-col>
              </v-row>
            </v-card-title>

            <v-card-text class="mt-5">
              <v-form ref="registerForm" v-model="isValid">
                <!--User name-->
                <v-text-field
                  ref="username"
                  label="username"
                  :rules="rules.required"
                  v-model="regformData.username"
                  outlined
                  placeholder="Enter username"
                />
                <!--Phone-->
                <v-text-field
                  ref="phone"
                  label="phone"
                  type="number"
                  :rules="rules.required"
                  v-model="regformData.phone"
                  outlined
                  placeholder="Enter phone"
                />

                <!-- Password -->
                <v-text-field
                  ref="password"
                  :rules="rules.required"
                  label="Password"
                  v-model="regformData.password"
                  outlined
                  placeholder="Enter Password"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>

            <v-card-actions class="mt-n6">
              <v-spacer />
              <v-btn color="primary" class="login-btn" @click="Register()">
                Register
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

    <v-snackbar v-model="errorsnackbar" class="mt-n12">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="errorsnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="bettingsnackbar" class="mt-n12">
      {{ betText }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="bettingsnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="playingsnackbar" class="mt-n12">
      {{ playingText }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="playingsnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
// import test from "./test.vue";

import AuthService from "../../auth/views/authService";
import io from "socket.io-client";

export default {
  name: "graphsPage",

  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("graph/getAllChats");
      v.$store.dispatch("graph/getAllBets");
      v.$store.dispatch("graph/getTopBets");
      if (AuthService.check()) {
        v.$store.dispatch("graph/getMyBets", {
          user_id: JSON.parse(AuthService.user).user_id,
        });
      }
    });
  },

  components: {
    // test,
  },

  data: () => ({
    snackbar: false,
    errorsnackbar: false,
    bettingsnackbar: false,
    playingsnackbar: false,
    text: "Insufficient Balance",
    playingText: "Bet cannot be below 1.01",
    betText: "Invalid Bet",
    screenSize: "",
    ChatMessage: "",
    betSession: false,

    defAmt: 10,

    topBets: false,
    myBets: false,
    allChats: false,
    allBets: true,
    bet_mlt: 1.1,
    liveBets: [],
    liveChats: [],
    TopWinningBets: [],
    liveMyBets: [],
    playing: false,
    dialog: false,
    registerDialog: false,

    isRunning: false,
    timer: null,
    liveMultiplierSwitch: true,
    crashPoint: 0,
    counter: 0,
    defcounter: 1.0,
    intervalId: null,
    isCounterRunning: false,
    isValid: false,
    formData: {
      phone: "",
      password: "",
    },

    regformData: {
      username: "",
      phone: "",
      password: "",
    },
    isValidPassword: false,
    showPassword: false,
    rules: {
      required: [(value) => !!value || "Required."],
    },
    BalanceCrash: 0,
    itemsToShow: 16,
  }),

  computed: {
    userDetails() {
      return JSON.parse(AuthService.user);
    },

    User() {
      return this.$store.getters["auth/authGetters"]("userD");
    },
    isLoggedIn() {
      return AuthService.check();
    },
    alertStatus() {
      return this.$store.getters["graph/graphGetters"]("alert");
    },
    alertMessage() {
      return this.$store.getters["auth/authGetters"]("alert");
    },
  },

  methods: {
    displayAllBets() {
      this.allBets = true;
      this.allChats = false;
      this.myBets = false;
      this.topBets = false;
    },
    displayMyBets() {
      this.myBets = true;
      this.allBets = false;
      this.allChats = false;
      this.topBets = false;
    },

    displayChats() {
      this.allChats = true;
      this.allBets = false;
      this.myBets = false;
      this.topBets = false;
    },

    displayTopBets() {
      this.topBets = true;
      this.allBets = false;
      this.allChats = false;
      this.myBets = false;
    },

    addOneThDefAmt() {
      this.defAmt = 1000;
    },
    addFiveDefAmt() {
      this.defAmt = 500;
    },

    addTwoDefAmt() {
      this.defAmt = 200;
    },

    addOneDefAmt() {
      this.defAmt = 100;
    },

    getColorForNumber(number) {
      const floorNumber = Math.floor(number);
      const hue = floorNumber * 40;

      // Set the saturation and lightness values
      const saturation = 80;
      const lightness = 60;

      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      return color;
    },

    sendBet() {
      if (this.defAmt > this.User.balance) {
        this.errorsnackbar = true;
      } else {
        if (this.defAmt === 0 || this.defAmt === "") {
          this.bettingsnackbar = true;
        } else {
          if (this.bet_mlt < 1.01) {
            this.playingsnackbar = true;
          } else {
            this.playing = true;
            const data = {
              user_id: this.userDetails.user_id,
              user_crash: this.bet_mlt,
              bet_amount: this.defAmt,
            };
            this.$store.dispatch("graph/sendBet", data);
            this.startCounter();
            this.$store.dispatch("auth/getUser", {
              phone: JSON.parse(AuthService.user).phone,
            });
          }
        }
      }
    },
    showSnackBar() {
      this.playingsnackbar = true;
    },
    handleButtonClick() {
      if (this.playing === false) {
        this.sendBet();
      } else {
        this.showSnackBar();
      }
    },
    addBetAmt() {
      this.defAmt += 10;
    },

    addBetMLT() {
      this.bet_mlt += 0.5;
    },

    reduceBetMLT() {
      this.bet_mlt -= 0.5;
    },
    reduceBetAmt() {
      if (this.defAmt > 0) {
        this.defAmt -= 10;
        if (this.defAmt < 0) {
          this.defAmt = 0; // Ensure defAmt doesn't go below 0
        }
      } else {
        this.bettingsnackbar = true;
      }
    },

    checkScreenSize() {
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      this.screenSize = isSmallScreen ? "Small" : "Large";
    },
    updateCounter() {
      this.counter = Math.floor(Math.random() * 20);
    },
    startCounter() {
      if (!this.isCounterRunning) {
        // alert('noma');
        this.playing = true;
        this.isCounterRunning = true;
        this.intervalId = setInterval(this.updateCounter, 1);
        setTimeout(this.stopCounter, 12000);
      }
    },
    stopCounter() {
      clearInterval(this.intervalId);
      this.isCounterRunning = false;
      this.playing = false;
    },
    resetCounter() {
      this.counter = 0;
    },
    formatInput() {
      this.bet_mlt = parseFloat(this.bet_mlt).toFixed(2);
    },

    sendMessage() {
      if (this.ChatMessage !== "") {
        const data = {
          message: this.ChatMessage,
          user_id: this.userDetails.user_id,
        };
        this.$store.dispatch("graph/sendMessage", data);
        this.$store.dispatch("graph/getAllChats");
        this.ChatMessage = "";
      }
    },

    Login() {
      if (!this.isValid) {
        this.$refs.loginForm.validate();
      } else {
        this.$store.dispatch("auth/login", this.formData);
      }
    },
    Register() {
      if (!this.isValid) {
        this.$refs.registerFormForm.validate();
      } else {
        this.$store.dispatch("auth/register", this.regformData);
      }
    },

    closeLoginDialog() {
      this.dialog = false;
      this.alertMessage.status = "";
    },
    openLoginDialog() {
      this.dialog = true;
    },

    openRegisterDialog() {
      this.registerDialog = true;
    },

    closeRegisterDialog() {
      this.registerDialog = false;
      this.alertMessage.status = "";
    },
    openCloseRegisterDialog() {
      this.registerDialog = true;
      this.dialog = false;
      this.alertMessage.status = "";
    },
    validateInput(event) {
      const inputText = event.target.value;

      event.target.value = inputText.replace(/[^0-9]/g, "");

      const numericValue = event.target.value;
      if (isNaN(numericValue)) {
        this.defAmt = 10;
      }
    },

    validateBetInput() {
      // Remove non-numeric and non-decimal characters
      this.bet_mlt = this.bet_mlt.replace(/[^0-9.]/g, "");

      // Allow only one decimal place
      const decimalIndex = this.bet_mlt.indexOf(".");
      if (decimalIndex !== -1) {
        this.bet_mlt = this.bet_mlt.slice(0, decimalIndex + 3);
      }
    },

    scrollToBottomTwo() {
      const second = this.$el.querySelector("#second-chats-col");
      second.scrollTop = second.scrollHeight;
    },

    scrollToBottomThree() {
      const third = this.$el.querySelector("#third-chats-col");
      third.scrollTop = third.scrollHeight;
    },
  },

  mounted() {
    const socket = io("https://api.tililtechnologies.com:3000", {
      autoConnect: true,
      transports: ["websocket"],
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        // Add any other headers you need here
      },
    });
    socket.on("plane_chat_all", (data) => {
      const chats = data.chatRecordsWithUserDetails;
      this.liveChats = chats.reverse();
    });
    if (AuthService.check()) {
      const ID = JSON.parse(AuthService.user).user_id;

      socket.on(`${ID}_limbo_bet`, (data) => {
        this.crashPoint = data.crash_point;
        this.BalanceCrash = data.updatedBalance;
        this.playing = false;
        this.stopCounter();
      });

      socket.on(`${ID}_limbo_my_bets`, (data) => {
        this.liveMyBets = data.betRecordsWithUserDetails;
      });
    }

    socket.on("limbo_top_bets", (data) => {
      this.TopWinningBets = data.topBets;
    });

    socket.on("limbo_bet_all", (data) => {
      this.liveBets = data.betRecordsWithUserDetails;
    });

    this.checkScreenSize(); // Check screen size initially
    window.addEventListener("resize", this.checkScreenSize);

    // Store the timeout ID in a variable
    let timeoutId;
    let myBetstimeoutId;

    if (
      this.liveChats.length === 0 ||
      this.TopWinningBets.length === 0 ||
      this.liveBets.length === 0
    ) {
      timeoutId = setTimeout(() => {
        this.$store.dispatch("graph/getAllChats");
        this.$store.dispatch("graph/getAllBets");
        this.$store.dispatch("graph/getTopBets");
      }, 1000);
    } else {
      clearTimeout(timeoutId);
    }

    if (this.liveMyBets.length === 0 && AuthService.check()) {
      myBetstimeoutId = setTimeout(() => {
        this.$store.dispatch("graph/getMyBets", {
          user_id: JSON.parse(AuthService.user).user_id,
        });
      }, 1000);
    } else {
      clearTimeout(myBetstimeoutId);
    }
  },

  watch: {
    liveChats: {
      handler: function () {
        if (this.liveChats.length > 0 && this.screenSize === "Large") {
          this.scrollToBottomTwo();
        } else {
          if (
            this.liveChats.length > 0 &&
            this.screenSize === "Small" &&
            this.allChats
          ) {
            this.scrollToBottomThree();
          }
        }
      },
      // deep: true,
    },
  },
};
</script>

<style>
@import url("../style.css");
</style>
