"use strict";

var Config = {
  supportsHistory : !!(window.history && history.pushState),
  inMaintenanceMode : false,

  treeName: 'mozilla-central',
  hgBaseURL: "https://hg.mozilla.org/",
  hgURL: "https://hg.mozilla.org/mozilla-central/",
  hgRevURL: "https://hg.mozilla.org/mozilla-central/rev/",
  hgPushlogURL: "https://hg.mozilla.org/mozilla-central/pushloghtml?changeset=",
  showBugURL: "https://bugzilla.mozilla.org/show_bug.cgi?id=",
  versionURL: "php/getVersion.php",

  // Here be dragons
  versionRE: /^mozilla\d+$/i,
  csetInputRE: /^(tip|[\da-f]{12,40})$/i,
  csetIDRE: /\b([\da-f]{12,40})\b/ig,
  leaveOpenRE: /(?:leave|keep)(?:-|\s+)open/i,
  bugNumRE: /\b(\d{4,7})\b/g,
  strictBugNumRE: /^(\d{4,7})$/,
  mergeRE: /\bmerg(ed?|ing)\b/i,
  backoutRE: /back(ing|ed)?\s*out/i,
  revertRE: /revert(ing)?/i,
  partialRevertRE: /(?:from|in)(?:\s+(?:rev(?:ision)?|c(?:hange)?set))?\s+([\da-f]{12,40})/i,
  partialTestRE: /test\s+for/i,
  revertRangeRE: /revert(?:ing)?\s+(?:\S+\s+)?to(?:\s+(?:rev(?:ision)?|c(?:hange)set))?\s+([\da-f]{12,40})/i,
  csetRangeRE: /\b([\da-f]{12,40})\s*(?:to|:|-|through)\s*([\da-f]{12,40})/i,
  hgRevRE: /https?:\/\/hg.mozilla.org\/mozilla-central\/rev\//ig,
  hgRevFullRE: /https?:\/\/hg.mozilla.org\/mozilla-central\/rev\/[\da-f]{12}/ig,
  hgPushlogRE: /https?:\/\/hg.mozilla.org\/mozilla-central\/pushloghtml\?changeset=/ig,
  emailRE: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,   // I'm not looking for RFC 822 compliance here!

  // The many ways bug numbers are specified
  bugRE1: /b(?:ug)?=(\d{4,7})\b/i,                       // e.g. b=XXXXXX
  bugRE2: /^fix(?:es)?\s*(?:for\s*)?(\d{4,7})\b/i,                         // Fix is sometimes used as a synonym for bug
  bugRE3: /to\s+fix\s+bug\s+(\d{4,7})/i,
  bugRE4: /\((\d{4,7}), r=/i,                          // e.g. JS-team style (XXXXXX, r=foo)
  bugRE5: /but\s*(\d{4,7})/i,                          // The typo but XXXXXX happens quite often
  bugRE6: /\bb(?:u?g(?:zilla)?)?:?\s*#?(\d{4,7})\b/i,  // The catchall
  bugRE7: /^(\d{4,7})\b/i,                              // e.g. XXXXXX,

  repoMergeRE: "\\s+(&|and|with|<->|<>|-?->|(in|on)?to)\\s+",

  mcSynonyms: ["mozilla-central", "central", "m-c", "mc", "mozilla central"],

  rewriteTrees: {
    "thunderbird-trunk": "comm-central",
    "thunderbird-aurora": "comm-aurora",
    "thunderbird-beta": "comm-beta",
    "thunderbird-release": "comm-release",
    "thunderbird-esr10": "comm-esr10",
  },

  treeInfo: {
    "mozilla-central": {
      repo: "mozilla-central",
      trackedTree: true,
      unconditionalFlag: false,
      synonyms: ["mozilla-central", "central", "m-c", "mc", "mozilla central"]
    },
    "mozilla-inbound": {
      repo: "integration/mozilla-inbound",
      trackedTree: false,
      unconditionalFlag: false,
      synonyms: ["mozilla-inbound", "inbound", "m-i", "mi"]
    },
    "mozilla-aurora": {
      repo: "releases/mozilla-aurora",
      trackedTree: true,
      unconditionalFlag: false,
      synonyms: ["releases/mozilla-aurora", "mozilla-aurora"]
    },
    "mozilla-beta": {
      repo: "releases/mozilla-beta",
      trackedTree: true,
      unconditionalFlag: false,
      synonyms: ["releases/mozilla-beta", "mozilla-beta"]
    },
    "mozilla-release": {
      repo: "releases/mozilla-release",
      trackedTree: true,
      unconditionalFlag: false,
      synonyms: ["releases/mozilla-release", "mozilla-release"]
    },
    "mozilla-esr10": {
      repo: "releases/mozilla-esr10",
      trackedTree: true,
      unconditionalFlag: false,
      synonyms: ["esr10", "releases/mozilla-esr10", "mozilla-esr10"]
    },
    "mozilla-esr17": {
      repo: "releases/mozilla-esr17",
      trackedTree: true,
      unconditionalFlag: false,
      synonyms: ["esr17", "releases/mozilla-esr17", "mozilla-esr17"]
    },
    "jetpack": {
      repo: "projects/addon-sdk",
      trackedTree: false,
      unconditionalFlag: false,
      synonyms: ["projects/addon-sdk", "addon-sdk"]
    },
    "build-system": {
      repo: "projects/build-system",
      trackedTree: false,
      unconditionalFlag: false,
      synonyms: ["build-system", "b-s", "bs"]
    },
    "fx-team": {
      repo: "integration/fx-team",
      trackedTree: false,
      unconditionalFlag: false,
      synonyms: ["fx-team"],
      additions: "[fixed-in-fx-team]"
    },
    "graphics": {
      repo: "projects/graphics",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/graphics", "graphics"]
    },
    "ionmonkey": {
      repo: "projects/ionmonkey",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/ionmonkey", "ionmonkey", "im"]
    },
    "jaegermonkey": {
      repo: "projects/jaegermonkey",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/jaegermonkey", "jm"]
    },
    "profiling": {
      repo: "projects/profiling",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["profiling", "projects/profiling"]
    },
    "services-central": {
      repo: "services/services-central",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["services-central", "s-c", "sc", "services/services-central"],
      additions: "[fixed in services]"
    },
    "ux": {
      unconditionalFlag: false,
      repo: "projects/ux",
      synonyms: ["ux", "projects/ux"]
    },
    "alder": {
      repo: "projects/alder",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["alder", "projects/alder"]
    },
    "ash": {
      repo: "projects/ash",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["ash", "projects/ash"]
    },
    "birch": {
      repo: "projects/birch",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/birch", "birch"]
    },
    "cedar": {
      repo: "projects/cedar",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/cedar", "cedar"]
    },
    "date": {
      repo: "projects/date",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/date", "date"]
    },
    "elm": {
      repo: "projects/elm",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/elm", "elm"]
    },
    "fig": {
      repo: "projects/fig",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/fig", "fig"]
    },
    "gum": {
      repo: "projects/gum",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/gum", "gum"]
    },
    "holly": {
      repo: "projects/holly",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/holly", "holly"]
    },
    "jamun": {
      repo: "projects/jamun",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/jamun", "jamun"]
    },
    "larch": {
      repo: "projects/larch",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/larch", "larch"]
    },
    "maple": {
      repo: "projects/maple",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/maple", "maple"]
    },
    "oak": {
      repo: "projects/oak",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/oak", "oak"]
    },
    "pine": {
      repo: "projects/pine",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/pine", "pine"]
    },
    "accessibility": {
      repo: "projects/accessibility",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/accessibility", "accessibility"]
    },
    "devtools": {
      repo: "projects/devtools",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/devtools", "devtools"]
    },
    "electrolysis": {
      repo: "projects/electrolysis",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/electrolysis", "electrolysis", "e10s"]
    },
    "places": {
      repo: "projects/places",
      unconditionalFlag: false,
      trackedTree: false,
      synonyms: ["projects/places", "places"]
    },
    "comm-central": {
      repo: "comm-central",
      unconditionalFlag: false,
      trackedTree: true,
      synonyms: ["comm-central", "c-c"]
    },
    "comm-aurora": {
      repo: "releases/comm-aurora",
      unconditionalFlag: false,
      trackedTree: true,
      synonyms: ["releases/comm-aurora", "comm-aurora"]
    },
    "comm-beta": {
      repo: "releases/comm-beta",
      unconditionalFlag: false,
      trackedTree: true,
      synonyms: ["releases/comm-beta", "comm-beta"]
    },
    "comm-release": {
      repo: "releases/comm-release",
      unconditionalFlag: false,
      trackedTree: true,
      synonyms: ["releases/comm-release", "comm-release"]
    },
    "comm-esr10": {
      repo: "releases/comm-esr10",
      unconditionalFlag: false,
      trackedTree: true,
      synonyms: ["releases/comm-esr10", "comm-esr10"]
    },
    "comm-esr17": {
      repo: "releases/comm-esr17",
      unconditionalFlag: false,
      trackedTree: true,
      synonyms: ["releases/comm-esr17", "comm-esr17"]
    },
    "mozilla-b2g18": {
      repo: "releases/mozilla-b2g18",
      unconditionalFlag: true,
      trackedTree: true,
      synonyms: ["b2g", "b2g18", "mozilla-b2g18"]
    }
  }
};

Config.bugNumberREs = [Config.bugRE1, Config.bugRE2, Config.bugRE3,
                       Config.bugRE4, Config.bugRE5, Config.bugRE6, Config.bugRE7];

(function () {
  var base = Config.hgBaseURL;
  for (var treeName in Config.treeInfo) {
    var repo = Config.treeInfo[treeName].repo; 
    Config.treeInfo[treeName]['hgURL'] = base + repo + '/';
    Config.treeInfo[treeName]['hgRevURL'] = base + repo + '/rev/';
    Config.treeInfo[treeName]['hgPushlogURL'] = base + repo + '/pushloghtml?changeset=';
    Config.treeInfo[treeName]['hgRevRE'] = new RegExp('https?:\/\/hg.mozilla.org\/' + repo + '\/rev\/', 'ig');
    Config.treeInfo[treeName]['hgRevFullRE'] = new RegExp('https?:\/\/hg.mozilla.org\/' + repo + '\/rev\/[\\da-f]{12}', 'ig');
    Config.treeInfo[treeName]['hgPushlogRE'] = new RegExp('https?:\/\/hg.mozilla.org\/' + repo + '\/pushloghtml\\?changeset=', 'ig');
  }
})();

// Detect input type="email" support
$(document).ready(function() {
  Config.needsValidation = $('#username').prop('type') != 'email';
});
