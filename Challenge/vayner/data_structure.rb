{
  campaign:   {
    "campaign_id" => <Campaign Object>,
    "campaign_id" => <Campaign Object>,
    "campaign_id" => <Campaign Object>
    ...
  },
  state: {
    "NY" => {
      campaign_id: [ array_of_campaign_ids ],
      total_spending: number,
      total_impression: number
    },
    "SD" => {
      campaign_id: [ array_of_campaign_ids ],
      total_spending: number,
      total_impression: number
    }
    ...
  },
  hair_color: {
    "blue" => {
      campaign_id: [ array_of_campaign_ids ],
      total_spending: number,
      total_impression: number
    },
    "purple" => {
      campaign_id: [ array_of_campaign_ids ],
      total_spending: number,
      total_impression: number
    }
    ...
  },
  age_range:  {
    "23-39" => {
      campaign_id: [ array_of_campaign_ids ],
      total_spending: number,
      total_impression: number
    },
    "33-45" => {
      campaign_id: [ array_of_campaign_ids ],
      total_spending: number,
      total_impression: number
    }
    ...
  },
  source:     {
    "A" => {
      campaign_id: [
        [id, date, action, value],
        [id, date, action, value],
        ...
      ],
      report_count: number
    },
    "B" => {
      campaign_id: [
        [id, date, action, value],
        [id, date, action, value],
        ...
      ],
      report_count: number
    }
    ...
  },
  action: {
    "click" => {
      campaign_id: [
        [k, date, source],
        [k, date, source],
        ...
      ]
    },
    "views" => {
      campaign_id: [
        [k, date, source],
        [k, date, source],
        ...
      ]
    }
    ...
  },
  date: {
    "2017-06-23" => {
      campaign_id: [ array_of_campaign_ids ]
    },
    "2017-07-23" => {
      campaign_id: [ array_of_campaign_ids ]
    }
    ...
  },
  ad_type: {
    "video" => {
      campaign_id: [
        [id, date],
        [id, date],
        ...
      ],
      total_spending: number,
      action_total: {
        "click" => number,
        "views" => number
        ...
      }
    },
    "photo" => {
      campaign_id: [
        [id, date],
        [id, date],
        ...
      ],
      total_spending: number,
      action_total: {
        "click" => number,
        "views" => number
        ...
      }
    }
    ...
  }
}
